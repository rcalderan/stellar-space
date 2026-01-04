import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, map } from 'rxjs';
import { AuthService } from './auth.service';
import { VideoFile } from '../models/video-file.model';

@Injectable({
    providedIn: 'root'
})
export class GoogleDriveService {
    private readonly CALENDAR_API_URL = 'https://www.googleapis.com/drive/v3/files';

    constructor(private http: HttpClient, private auth: AuthService) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.auth.getGoogleToken()}`
        });
    }

    listVideos(): Observable<VideoFile[]> {
        const params = {
            q: "mimeType contains 'video/' and trashed = false",
            fields: 'files(id, name, mimeType, createdTime, size, thumbnailLink)',
        };

        return this.http.get<{ files: any[] }>(this.CALENDAR_API_URL, {
            headers: this.getHeaders(),
            params
        }).pipe(
            map(res => res.files.map(f => ({
                ...f,
                source: 'google',
                status: 'pending',
                downloadProgress: 0,
                uploadProgress: 0,
                selected: true,
                deleteAfter: false
            } as VideoFile)))
        );
    }

    downloadFile(fileId: string): Observable<Blob> {
        return this.http.get(`${this.CALENDAR_API_URL}/${fileId}?alt=media`, {
            headers: this.getHeaders(),
            responseType: 'blob'
        });
    }

    deleteFile(fileId: string): Observable<any> {
        return this.http.delete(`${this.CALENDAR_API_URL}/${fileId}`, {
            headers: this.getHeaders()
        });
    }
}
