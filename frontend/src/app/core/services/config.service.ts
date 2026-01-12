import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    readonly google = {
        clientId: '342736540910-tu9bo2nipktv3e24chflikbovj61oa9q.apps.googleusercontent.com',
        redirectUri: 'http://localhost:4201/oauth2callback',
        scopes: [
            'https://www.googleapis.com/auth/drive.readonly',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/youtube.upload',
            'https://www.googleapis.com/auth/youtube.readonly'
        ].join(' ')
    };

    readonly microsoft = {
        clientId: 'your_microsoft_client_id', // Needs to be updated by user
        redirectUri: 'http://localhost:4201/callback',
        scopes: 'files.read offline_access'
    };

    constructor() { }
}
