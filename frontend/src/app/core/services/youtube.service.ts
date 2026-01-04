import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class YouTubeService {
    private readonly YOUTUBE_API_URL = 'https://www.googleapis.com/upload/youtube/v3/videos';

    constructor(private http: HttpClient, private auth: AuthService) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.auth.getGoogleToken()}`
        });
    }

    uploadVideo(file: Blob, metadata: any): Observable<any> {
        const headers = this.getHeaders();
        const formData = new FormData();

        formData.append('snippet', new Blob([JSON.stringify(metadata.snippet)], { type: 'application/json' }));
        formData.append('status', new Blob([JSON.stringify(metadata.status)], { type: 'application/json' }));
        formData.append('video', file);

        // Multi-part upload for simplicity in the demo, 
        // for large files we would need resumable session
        return this.http.post(`${this.YOUTUBE_API_URL}?part=snippet,status`, formData, {
            headers,
            reportProgress: true,
            observe: 'events'
        });
    }

    checkDuplicate(title: string): Observable<boolean> {
        // Basic search to check if video exists
        const url = 'https://www.googleapis.com/youtube/v3/search';
        const params = {
            part: 'snippet',
            forMine: 'true',
            q: title,
            type: 'video',
            maxResults: '1'
        };

        return this.http.get<any>(url, { headers: this.getHeaders(), params }).pipe(
            map(res => res.items && res.items.length > 0)
        );
    }
}
