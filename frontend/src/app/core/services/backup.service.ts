import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { VideoFile } from '../models/video-file.model';
import { GoogleDriveService } from './google-drive.service';
import { YouTubeService } from './youtube.service';

@Injectable({
    providedIn: 'root'
})
export class BackupService {
    private filesSubject = new BehaviorSubject<VideoFile[]>([]);
    files$ = this.filesSubject.asObservable();

    private isRunningSubject = new BehaviorSubject<boolean>(false);
    isRunning$ = this.isRunningSubject.asObservable();

    constructor(
        private googleDrive: GoogleDriveService,
        private youtube: YouTubeService
    ) { }

    addFiles(newFiles: VideoFile[]) {
        const current = this.filesSubject.value;
        this.filesSubject.next([...current, ...newFiles]);
    }

    async runBackup() {
        if (this.isRunningSubject.value) return;
        this.isRunningSubject.next(true);

        const targetFiles = this.filesSubject.value.filter(f => f.selected && f.status === 'pending');

        for (const file of targetFiles) {
            try {
                file.status = 'downloading';
                file.downloadProgress = 10;
                this.updateFile(file);

                // 1. Check duplicate
                const isDuplicate = await firstValueFrom(this.youtube.checkDuplicate(file.name));
                if (isDuplicate) {
                    file.status = 'success';
                    file.downloadProgress = 100;
                    file.uploadProgress = 100;
                    this.updateFile(file);
                    continue;
                }

                // 2. Download
                const blob = await firstValueFrom(this.googleDrive.downloadFile(file.id));
                file.downloadProgress = 100;
                file.status = 'uploading';
                file.uploadProgress = 10;
                this.updateFile(file);

                // 3. Upload
                const metadata = {
                    snippet: { title: file.name, description: 'Backup from Stellar Space' },
                    status: { privacyStatus: 'private' }
                };

                await firstValueFrom(this.youtube.uploadVideo(blob, metadata));
                file.uploadProgress = 100;

                // 4. Delete source if marked
                if (file.deleteAfter) {
                    await firstValueFrom(this.googleDrive.deleteFile(file.id));
                    file.status = 'deleted';
                } else {
                    file.status = 'success';
                }

                this.updateFile(file);

            } catch (err: any) {
                file.status = 'error';
                file.error = err.message || 'Unknown error';
                this.updateFile(file);
            }
        }

        this.isRunningSubject.next(false);
    }

    toggleAll(selected: boolean) {
        const current = this.filesSubject.value;
        current.forEach(f => f.selected = selected);
        this.filesSubject.next([...current]);
    }

    setDeleteAll(deleteAfter: boolean) {
        const current = this.filesSubject.value;
        current.forEach(f => f.deleteAfter = deleteAfter);
        this.filesSubject.next([...current]);
    }

    async cleanupRemaining() {
        const successFiles = this.filesSubject.value.filter(f =>
            (f.status === 'success') && !f.status.includes('deleted')
        );

        for (const file of successFiles) {
            try {
                await firstValueFrom(this.googleDrive.deleteFile(file.id));
                file.status = 'deleted';
                this.updateFile(file);
            } catch (err) {
                console.error(`Failed to delete ${file.name}`);
            }
        }
    }

    private updateFile(file: VideoFile) {
        const current = this.filesSubject.value;
        const index = current.findIndex(f => f.id === file.id && f.source === file.source);
        if (index !== -1) {
            current[index] = { ...file };
            this.filesSubject.next([...current]);
        }
    }
}
