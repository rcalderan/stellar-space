import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-integration-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card flex flex-col gap-4 font-mono">
      <h2 class="text-xs font-bold text-cyan-600 uppercase tracking-[0.2em] border-b border-cyan-500/20 pb-2">Active_Uplinks</h2>
      
      <!-- Google Card -->
      <div class="p-3 border border-cyan-500/10 bg-cyan-950/10 flex items-center justify-between group hover:border-cyan-500/30 transition-all">
        <div class="flex items-center gap-3">
          <div class="relative w-8 h-8 flex items-center justify-center bg-cyan-950 border border-cyan-800 rounded-sm">
             <span class="text-lg grayscale group-hover:grayscale-0 transition-all">G</span>
             <div class="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" *ngIf="isConnected"></div>
          </div>
          <div>
            <h3 class="font-bold text-cyan-50 text-[10px] uppercase tracking-wider">DriveLINK</h3>
            <p class="text-[8px] text-cyan-600 uppercase">{{ isConnected ? 'SIGNAL_LOCKED' : 'NO_CARRIER' }}</p>
          </div>
        </div>
        <button (click)="onAction()" 
                class="px-3 py-1 text-[8px] font-black uppercase tracking-widest border transition-all hover:bg-cyan-500 hover:text-black"
                [class.border-cyan-500]="!isConnected"
                [class.text-cyan-400]="!isConnected"
                [class.border-emerald-500]="isConnected"
                [class.text-emerald-400]="isConnected">
          {{ isConnected ? 'RESET' : 'CONNECT' }}
        </button>
      </div>

      <!-- OneDrive Coming Soon -->
      <div class="p-3 border border-dashed border-gray-700 bg-black/40 flex items-center justify-between opacity-50">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 flex items-center justify-center bg-gray-900 border border-gray-800 rounded-sm">
             <span class="text-lg text-gray-600">M</span>
          </div>
          <div>
            <h3 class="font-bold text-gray-500 text-[10px] uppercase tracking-wider">MS_Cloud</h3>
            <p class="text-[8px] text-gray-700 uppercase">OFFLINE</p>
          </div>
        </div>
        <div class="px-2 py-1 text-[8px] font-bold text-gray-600 border border-gray-800 uppercase">
          LOCKED
        </div>
      </div>
      
      <div class="mt-4 p-2 bg-cyan-950/20 border-l-2 border-cyan-500 text-[9px] text-cyan-300/60 leading-relaxed font-mono">
        > SYSTEM MESSAGE:<br>
        > Secure protocol initialized.<br>
        > Waiting for user directive...
      </div>
    </div>
  `,
  styles: []
})
export class IntegrationStatusComponent {
  @Input() isConnected = false;
  @Input() onAction: () => void = () => { };
}
