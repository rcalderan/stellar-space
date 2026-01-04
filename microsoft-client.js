const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');
const config = require('./config');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const TOKEN_PATH = path.join(__dirname, 'microsoft_token.json');

let accessToken = null;

function getAuthUrl() {
    const url = `https://login.microsoftonline.com/${config.microsoft.tenantId}/oauth2/v2.0/authorize?client_id=${config.microsoft.clientId}&response_type=code&redirect_uri=${encodeURIComponent(config.microsoft.redirectUri)}&response_mode=query&scope=files.readwrite.all user.read offline_access`;
    return url;
}

async function setToken(code) {
    const params = new URLSearchParams();
    params.append('client_id', config.microsoft.clientId);
    params.append('client_secret', config.microsoft.clientSecret);
    params.append('code', code);
    params.append('redirect_uri', config.microsoft.redirectUri);
    params.append('grant_type', 'authorization_code');

    const res = await axios.post(`https://login.microsoftonline.com/${config.microsoft.tenantId}/oauth2/v2.0/token`, params);
    const tokens = res.data;
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    accessToken = tokens.access_token;
    return tokens;
}

function loadToken() {
    if (fs.existsSync(TOKEN_PATH)) {
        const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH));
        accessToken = tokens.access_token;
        // Should handle refresh token logic here if needed
        return true;
    }
    return false;
}

function getClient() {
    return Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        },
    });
}

async function listVideos() {
    const client = getClient();
    const res = await client.api('/me/drive/root/search(q=\'\')')
        .filter("file ne null and (startsWith(file/mimeType, 'video/'))")
        .get();
    return res.value;
}

async function downloadFile(fileId, destPath) {
    const client = getClient();
    const response = await client.api(`/me/drive/items/${fileId}/content`).get();
    // This returns a stream or blob depending on env. 
    // In Node it's usually better to use the downloadUrl directly if available
    const item = await client.api(`/me/drive/items/${fileId}`).get();
    const downloadUrl = item['@microsoft.graph.downloadUrl'];

    const writer = fs.createWriteStream(destPath);
    const downloadRes = await axios({
        url: downloadUrl,
        method: 'GET',
        responseType: 'stream'
    });
    downloadRes.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function deleteFile(fileId) {
    const client = getClient();
    await client.api(`/me/drive/items/${fileId}`).delete();
}

module.exports = {
    getAuthUrl,
    setToken,
    loadToken,
    listVideos,
    downloadFile,
    deleteFile
};
