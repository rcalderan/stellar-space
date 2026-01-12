import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleDriveService } from '../../core/services/google-drive.service';
import { BackupService } from '../../core/services/backup.service';
import { VideoFile } from '../../core/models/video-file.model';
import { IntegrationStatusComponent } from './components/integration-status.component';
import { MissionSummaryComponent } from './components/mission-summary.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [CommonModule, FormsModule, IntegrationStatusComponent, MissionSummaryComponent],
  template: `
    <div class="max-w-[1800px] mx-auto pt-6 px-6 pb-20 font-mono scanline">
      
      <!-- HUD Header -->
      <div class="flex items-center justify-between mb-8 border-b border-cyan-500/20 pb-4">
        <div class="flex items-center gap-4">
          <div class="p-2 border border-cyan-500/30 bg-cyan-900/10">
             <span class="text-2xl text-cyan-400">❖</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-cyan-50 tracking-[0.2em] uppercase">Stellar<span class="text-cyan-400">Space</span>_CMD</h1>
            <p class="text-[10px] text-cyan-600 uppercase tracking-[0.3em]">System.Status: ACTIVE // Mode: TRANSFER</p>
          </div>
        </div>
        
        <div class="flex gap-4">
           <button (click)="loadFiles()" class="px-6 py-2 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all font-bold text-xs uppercase tracking-widest text-cyan-100 flex items-center gap-2 group">
             <span class="group-hover:animate-pulse">📡</span> INIT_SCAN_SEQUENCE
           </button>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-6">
        
        <!-- Left Column: Uplinks -->
        <div class="col-span-12 lg:col-span-3">
          <app-integration-status 
            [isConnected]="auth.isGoogleAuthenticated()"
            [onAction]="auth.loginGoogle.bind(auth)">
          </app-integration-status>
        </div>

        <!-- Middle Column: Data Grid -->
        <div class="col-span-12 lg:col-span-6 space-y-4">
          <!-- Control Bar -->
          <div class="flex items-center justify-between px-4 py-3 bg-cyan-950/30 border border-cyan-500/20">
             <div class="flex items-center gap-4">
                <input type="checkbox" (change)="toggleAll($event)" checked
                       class="w-4 h-4 rounded-none bg-black border-cyan-500/50 text-cyan-500 focus:ring-0 focus:ring-offset-0">
                <span class="text-xs font-bold text-cyan-300 uppercase tracking-widest">SELECT_ALL_TARGETS</span>
             </div>
             <div class="flex items-center gap-4">
                <span class="text-[10px] font-bold text-red-400/80 uppercase tracking-widest">AUTO_PURGE_SOURCE</span>
                <input type="checkbox" (change)="toggleDeleteAll($event)"
                       class="w-4 h-4 rounded-none bg-black border-red-500/50 text-red-500 focus:ring-0 focus:ring-offset-0">
             </div>
          </div>

          <!-- File Grid -->
          <div class="space-y-2">
            <div *ngFor="let file of backup.files$ | async" 
                 class="glass-card group relative transition-all duration-300 hover:bg-cyan-900/20"
                 [class.opacity-50]="!file.selected">
              
              <div class="flex items-center gap-4 relative z-10">
                <input type="checkbox" [(ngModel)]="file.selected" 
                       class="w-5 h-5 rounded-none bg-black border-cyan-500/50 text-cyan-400 focus:ring-0">
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-sm font-bold text-cyan-50 truncate tracking-tight font-mono">{{ file.name }}</h3>
                    <div class="flex items-center gap-2">
                      <span class="text-[9px] font-bold py-0.5 px-2 bg-black/40 border border-cyan-500/20 text-cyan-200 uppercase">
                        {{ file.size ? (file.size / 1024 / 1024 | number:'1.0-2') + ' MB' : 'N/A' }}
                      </span>
                      <span class="px-2 py-0.5 text-[9px] font-bold uppercase tracking-tighter border border-transparent"
                            [class.border-cyan-500/20]="file.source === 'google'"
                            [class.text-cyan-400]="file.source === 'google'">
                        src:{{ file.source }}
                      </span>
                    </div>
                  </div>

                  <!-- Progress Bars (Slim) -->
                  <div class="grid grid-cols-2 gap-4">
                     <div>
                        <div class="flex justify-between text-[8px] font-bold text-cyan-700 uppercase mb-1">
                          <span>DL_STREAM</span>
                          <span class="text-cyan-400">{{ file.downloadProgress }}%</span>
                        </div>
                        <div class="h-1 bg-cyan-950 w-full overflow-hidden">
                          <div class="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                               [style.width.%]="file.downloadProgress"></div>
                        </div>
                     </div>
                     <div>
                        <div class="flex justify-between text-[8px] font-bold text-fuchsia-700 uppercase mb-1">
                          <span>UL_STREAM</span>
                          <span class="text-fuchsia-400">{{ file.uploadProgress }}%</span>
                        </div>
                        <div class="h-1 bg-fuchsia-950 w-full overflow-hidden">
                          <div class="h-full bg-fuchsia-500 shadow-[0_0_10px_rgba(232,121,249,0.5)]"
                               [style.width.%]="file.uploadProgress"></div>
                        </div>
                     </div>
                  </div>
                </div>

                <!-- Status Block -->
                <div class="text-right w-24">
                  <div class="text-[9px] font-black uppercase tracking-widest mb-1"
                       [class.text-cyan-400]="file.status === 'pending'"
                       [class.text-yellow-400]="file.status === 'downloading' || file.status === 'uploading'"
                       [class.text-emerald-400]="file.status === 'success'"
                       [class.text-red-500]="file.status === 'error'">
                    [{{ file.status | uppercase }}]
                  </div>
                  <div *ngIf="file.deleteAfter" class="text-[8px] text-red-500/80 font-bold uppercase">>> PURGE <<</div>
                </div>
              </div>
            </div>
          </div>
          
          <div *ngIf="(backup.files$ | async)?.length === 0" class="py-24 text-center border border-cyan-500/10 bg-black/20 border-dashed">
             <div class="text-4xl mb-4 opacity-50 text-cyan-800">∅</div>
             <p class="text-cyan-700 font-mono uppercase tracking-[0.2em] text-xs">NO_DATA_SIGNATURES_FOUND</p>
          </div>
        </div>

        <!-- Right Column: Telemetry -->
        <div class="col-span-12 lg:col-span-3 space-y-6">
          <app-mission-summary
            [completionRate]="getOverallCompletion()"
            [successCount]="countFiles('success')"
            [warningCount]="0"
            [errorCount]="countFiles('error')">
          </app-mission-summary>

          <!-- Action Button -->
          <div class="glass-card flex flex-col gap-4 p-4">
             <button [disabled]="(backup.isRunning$ | async) || countFiles('selected') === 0"
                    (click)="backup.runBackup()"
                    class="stellar-btn w-full flex items-center justify-center gap-2 group">
               <span class="group-hover:text-cyan-300 transition-colors">>></span>
               <span>{{ (backup.isRunning$ | async) ? 'SEQ_RUNNING...' : 'EXEC_MIGRATION' }}</span>
             </button>
             
             <button *ngIf="countFiles('success') > 0"
                    (click)="backup.cleanupRemaining()"
                    class="w-full py-3 border border-red-500/30 text-red-500/70 hover:bg-red-500/10 hover:text-red-500 transition-all font-mono text-[10px] uppercase tracking-widest">
               [!] INIT_DRIVE_WIPE
             </button>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: []
})
export class BackupComponent implements OnInit {
  constructor(
    public backup: BackupService,
    public auth: AuthService,
    private googleDrive: GoogleDriveService
  ) { }

  ngOnInit() { }

  loadFiles() {
    this.googleDrive.listVideos().subscribe((files: VideoFile[]) => {
      this.backup.addFiles(files);
    });
  }

  toggleAll(event: any) {
    this.backup.toggleAll(event.target.checked);
  }

  toggleDeleteAll(event: any) {
    this.backup.setDeleteAll(event.target.checked);
  }

  getOverallCompletion(): number {
    const files = (this.backup as any).filesSubject?.value || [];
    if (files.length === 0) return 0;
    const totalProgress = files.reduce((acc: number, f: VideoFile) => acc + (f.downloadProgress + f.uploadProgress) / 2, 0);
    return totalProgress / (files.length * 100);
  }

  countFiles(type: string): number {
    let count = 0;
    const files = (this.backup as any).filesSubject?.value || [];
    if (type === 'selected') count = files.filter((f: any) => f.selected && f.status === 'pending').length;
    if (type === 'success') count = files.filter((f: any) => f.status === 'success' || f.status === 'deleted').length;
    if (type === 'error') count = files.filter((f: any) => f.status === 'error').length;
    return count;
  }
}
