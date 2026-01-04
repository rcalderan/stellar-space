const fs = require('fs-extra');
const config = require('./config');

async function showReport() {
    if (!fs.existsSync(config.reportFile)) {
        console.log('No report found.');
        return;
    }

    const report = await fs.readJson(config.reportFile);
    console.log('\n--- Sync Report ---');
    console.table(report.map(r => ({
        Date: r.date.split('T')[0],
        'Old Name': r.oldName,
        'New Name': r.newName || 'N/A',
        Source: r.source,
        Status: r.status
    })));
}

showReport();
