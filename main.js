const googleClient = require('./google-client');
const microsoftClient = require('./microsoft-client');
const fs = require('fs-extra');
const path = require('path');
const config = require('./config');

async function checkDuplicatesOnYouTube(filename) {
    const existing = await googleClient.getYouTubeVideos();
    const cleanName = filename.split('.')[0].toLowerCase();
    return existing.some(v => v.snippet.title.toLowerCase().includes(cleanName));
}

function generateMetadata(filename) {
    // Simple logic for now: title is filename without ext, description is a placeholder
    const base = path.parse(filename).name;
    const title = base.charAt(0).toUpperCase() + base.slice(1).replace(/[_-]/g, ' ');
    const description = `Backup from Drive: ${filename}\nUploaded on ${new Date().toISOString()}`;
    return { title, description };
}

async function processDrive() {
    console.log('Fetching videos from Google Drive...');
    const googleVideos = (await googleClient.listVideos() || []).map(v => ({ ...v, source: 'google', date: new Date(v.createdTime) }));

    console.log('Fetching videos from OneDrive...');
    const microsoftVideos = (await microsoftClient.listVideos() || []).map(v => ({
        id: v.id,
        name: v.name,
        source: 'microsoft',
        date: new Date(v.fileSystemInfo.createdDateTime || v.createdDateTime)
    }));

    const allVideos = [...googleVideos, ...microsoftVideos].sort((a, b) => a.date - b.date);
    console.log(`Found ${allVideos.length} videos in total.`);

    const report = [];

    for (const video of allVideos) {
        console.log(`Processing [${video.source}]: ${video.name}...`);

        try {
            const isDuplicate = await checkDuplicatesOnYouTube(video.name);
            if (isDuplicate) {
                console.log(`Skip duplicate: ${video.name}`);
                continue;
            }

            const { title, description } = generateMetadata(video.name);
            const tempPath = path.join(__dirname, 'temp_' + video.name);

            if (video.source === 'google') {
                const dest = fs.createWriteStream(tempPath);
                const driveRes = await googleClient.drive.files.get(
                    { fileId: video.id, alt: 'media' },
                    { responseType: 'stream' }
                );
                await new Promise((resolve, reject) => {
                    driveRes.data.pipe(dest);
                    dest.on('finish', resolve);
                    dest.on('error', reject);
                });
            } else {
                await microsoftClient.downloadFile(video.id, tempPath);
            }

            console.log(`Uploading ${video.name} to YouTube as ${title}...`);
            await googleClient.uploadToYouTube(tempPath, title, description);

            console.log(`Deleting ${video.name} from ${video.source}...`);
            if (video.source === 'google') {
                await googleClient.deleteFile(video.id);
            } else {
                await microsoftClient.deleteFile(video.id);
            }

            report.push({
                date: new Date().toISOString(),
                originalDate: video.date.toISOString(),
                oldName: video.name,
                newName: title,
                description: description,
                source: video.source,
                status: 'Success'
            });

        } catch (err) {
            console.error(`Error processing ${video.name}:`, err.response?.data || err.message);
            report.push({
                date: new Date().toISOString(),
                oldName: video.name,
                source: video.source,
                status: 'Error',
                message: err.message
            });
        } finally {
            const tempPath = path.join(__dirname, 'temp_' + video.name);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
    }

    await fs.writeJson(config.reportFile, report, { spaces: 2 });
    console.log('Process complete. Report saved to ' + config.reportFile);
}

// In a real scenario, we'd need a CLI or Express to trigger this after Auth.
module.exports = { processDrive };
