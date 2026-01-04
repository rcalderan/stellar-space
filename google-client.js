const { google } = require('googleapis');
const config = require('./config');
const fs = require('fs');
const path = require('path');

const TOKEN_PATH = path.join(__dirname, 'google_token.json');

const oauth2Client = new google.auth.OAuth2(
    config.google.clientId,
    config.google.clientSecret,
    config.google.redirectUri
);

function getAuthUrl() {
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/drive.readonly',
            'https://www.googleapis.com/auth/drive.file', // for deleting? Or drive.readonly and drive?
            'https://www.googleapis.com/auth/youtube.upload',
            'https://www.googleapis.com/auth/youtube.readonly'
        ],
    });
}

async function setToken(code) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    return tokens;
}

function loadToken() {
    if (fs.existsSync(TOKEN_PATH)) {
        const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH));
        oauth2Client.setCredentials(tokens);
        return true;
    }
    return false;
}

const drive = google.drive({ version: 'v3', auth: oauth2Client });
const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

async function listVideos() {
    const res = await drive.files.list({
        q: "mimeType contains 'video/' and trashed = false",
        fields: 'files(id, name, mimeType, createdTime, size)',
    });
    return res.data.files;
}

async function getYouTubeVideos() {
    const res = await youtube.search.list({
        mine: true,
        part: 'snippet',
        type: 'video',
        maxResults: 50
    });
    return res.data.items;
}

async function uploadToYouTube(filePath, title, description) {
    const fileSize = fs.statSync(filePath).size;
    const res = await youtube.videos.insert({
        part: 'snippet,status',
        requestBody: {
            snippet: {
                title,
                description,
                categoryId: '22', // People & Blogs
            },
            status: {
                privacyStatus: 'private', // Default to private
            },
        },
        media: {
            body: fs.createReadStream(filePath),
        },
    }, {
        onUploadProgress: evt => {
            const progress = (evt.bytesRead / fileSize) * 100;
            console.log(`${Math.round(progress)}% complete`);
        },
    });
    return res.data;
}

async function deleteFile(fileId) {
    await drive.files.delete({ fileId });
}

module.exports = {
    getAuthUrl,
    setToken,
    loadToken,
    listVideos,
    getYouTubeVideos,
    uploadToYouTube,
    deleteFile,
    drive
};
