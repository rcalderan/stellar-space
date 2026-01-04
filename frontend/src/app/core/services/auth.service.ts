import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly GOOGLE_TOKEN_KEY = 'google_token';
    private readonly MICROSOFT_TOKEN_KEY = 'microsoft_token';

    constructor(private config: ConfigService) { }

    loginGoogle() {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${this.config.google.clientId}&` +
            `redirect_uri=${encodeURIComponent(this.config.google.redirectUri)}&` +
            `response_type=token&` + // Using implicit flow or code flow? Implicit is easier for pure frontend
            `scope=${encodeURIComponent(this.config.google.scopes)}&` +
            `include_granted_scopes=true&` +
            `state=google`;

        window.location.href = url;
    }

    loginMicrosoft() {
        const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
            `client_id=${this.config.microsoft.clientId}&` +
            `response_type=token&` +
            `redirect_uri=${encodeURIComponent(this.config.microsoft.redirectUri)}&` +
            `scope=${encodeURIComponent(this.config.microsoft.scopes)}&` +
            `state=microsoft`;

        window.location.href = url;
    }

    handleCallback() {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const token = params.get('access_token');
        const state = params.get('state');

        if (token) {
            if (state === 'google') {
                localStorage.setItem(this.GOOGLE_TOKEN_KEY, token);
            } else if (state === 'microsoft') {
                localStorage.setItem(this.MICROSOFT_TOKEN_KEY, token);
            }
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    getGoogleToken(): string | null {
        return localStorage.getItem(this.GOOGLE_TOKEN_KEY);
    }

    getMicrosoftToken(): string | null {
        return localStorage.getItem(this.MICROSOFT_TOKEN_KEY);
    }

    isGoogleAuthenticated(): boolean {
        return !!this.getGoogleToken();
    }

    isMicrosoftAuthenticated(): boolean {
        return !!this.getMicrosoftToken();
    }

    logout() {
        localStorage.removeItem(this.GOOGLE_TOKEN_KEY);
        localStorage.removeItem(this.MICROSOFT_TOKEN_KEY);
    }
}
