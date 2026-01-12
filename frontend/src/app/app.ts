import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { StellarBackgroundComponent } from './shared/components/stellar-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, StellarBackgroundComponent],
  template: `
    <app-stellar-background></app-stellar-background>
    
    <nav class="group px-6 py-4 flex items-center justify-between relative z-50 border-b border-cyan-900/50 bg-black/80 backdrop-blur-md scanline">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center border border-cyan-500/50 bg-cyan-950/20">
          <span class="text-xl text-cyan-400 font-mono animate-pulse">◈</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold tracking-[0.2em] text-cyan-50 font-mono uppercase leading-none">STELLAR<span class="text-cyan-600">_NODE</span></span>
          <span class="text-[8px] text-cyan-700 uppercase tracking-[0.4em] font-mono leading-none mt-1">v3.0.4 // SYSTEM_READY</span>
        </div>
      </div>
      
      <div class="flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-800 font-mono">
        <a routerLink="/" routerLinkActive="text-cyan-400 border-b border-cyan-400" class="hover:text-cyan-400 hover:border-b hover:border-cyan-800 pb-1 transition-all">>> DASHBOARD</a>
        <a routerLink="/backup" routerLinkActive="text-cyan-400 border-b border-cyan-400" class="hover:text-cyan-400 hover:border-b hover:border-cyan-800 pb-1 transition-all">>> MISSIONS</a>
        <a routerLink="/docs" routerLinkActive="text-cyan-400 border-b border-cyan-400" class="hover:text-cyan-400 hover:border-b hover:border-cyan-800 pb-1 transition-all">>> TELEMETRY</a>
      </div>

      <div class="flex items-center gap-6">
        <div *ngIf="auth.isGoogleAuthenticated()" class="flex items-center gap-3 px-4 py-1 border border-cyan-900/50 bg-cyan-950/10">
           <div class="w-1.5 h-1.5 bg-emerald-500 animate-pulse"></div>
           <span class="text-[9px] font-bold text-cyan-600 uppercase tracking-widest font-mono">UPLINK_ESTABLISHED</span>
        </div>
        <button (click)="auth.logout()" *ngIf="auth.isGoogleAuthenticated()" class="text-[9px] font-bold text-red-900 hover:text-red-500 hover:bg-red-950/30 px-3 py-1 transition-all uppercase tracking-widest font-mono border border-transparent hover:border-red-900/50">
          [ TERM_SIGOFF ]
        </button>
      </div>
    </nav>

    <main class="relative z-10">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.handleCallback();
  }
}
