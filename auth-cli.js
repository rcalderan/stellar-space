const googleClient = require('./google-client');
const microsoftClient = require('./microsoft-client');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    console.log('--- Video Backup Auth Tool ---');
    console.log('1. Authenticate with Google (Drive & YouTube)');
    console.log('2. Authenticate with Microsoft (OneDrive)');
    console.log('3. Run Backup');
    console.log('4. Exit');

    rl.question('Choose an option: ', async (choice) => {
        if (choice === '1') {
            console.log('Open this URL in your browser:');
            console.log(googleClient.getAuthUrl());
            rl.question('Enter the code from the redirect URL: ', async (code) => {
                await googleClient.setToken(code);
                console.log('Google Authenticated!');
                main();
            });
        } else if (choice === '2') {
            console.log('Open this URL in your browser:');
            console.log(microsoftClient.getAuthUrl());
            rl.question('Enter the code from the redirect URL: ', async (code) => {
                await microsoftClient.setToken(code);
                console.log('Microsoft Authenticated!');
                main();
            });
        } else if (choice === '3') {
            const { processDrive } = require('./main');
            await processDrive();
            main();
        } else {
            console.log('Goodbye!');
            process.exit(0);
        }
    });
}

main();
