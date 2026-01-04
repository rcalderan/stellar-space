require('dotenv').config();
const path = require('path');

module.exports = {
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_REDIRECT_URI,
    },
    microsoft: {
        clientId: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        tenantId: process.env.MICROSOFT_TENANT_ID || 'common',
        redirectUri: process.env.MICROSOFT_REDIRECT_URI,
    },
    reportFile: path.join(__dirname, process.env.REPORT_FILE || 'backup_report.json'),
    port: process.env.PORT || 3000
};
