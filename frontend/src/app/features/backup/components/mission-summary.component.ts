import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mission-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card flex flex-col items-center font-mono">
      <h2 class="text-xs font-bold mb-6 text-cyan-600 self-start uppercase tracking-[0.2em] border-b border-cyan-500/20 w-full pb-2">
        Telemetry_Module
      </h2>
      
      <!-- Tech Chart -->
      <div class="relative w-40 h-40 mb-6 flex items-center justify-center">
        <!-- Outer Static Ring -->
        <div class="absolute inset-0 border-2 border-cyan-900/40 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
        
        <!-- Progress Ring -->
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="36" fill="transparent" 
                  stroke="#083344" stroke-width="8" />
          <circle cx="50" cy="50" r="36" fill="transparent" 
                  stroke="#22d3ee" stroke-width="8"
                  [attr.stroke-dasharray]="226"
                  [attr.stroke-dashoffset]="226 * (1 - completionRate)"
                  stroke-linecap="butt" />
        </svg>

        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-3xl font-bold text-cyan-100">{{ (completionRate * 100) | number:'1.0-0' }}<span class="text-sm">%</span></span>
          <span class="text-[8px] font-bold text-cyan-700 uppercase tracking-widest">COMPLETE</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 w-full mb-6">
        <div class="p-2 border border-cyan-500/20 bg-cyan-950/20">
          <div class="text-[8px] text-cyan-600 uppercase mb-1">Success_Rate</div>
          <div class="text-lg font-bold text-emerald-400">{{ successCount }}</div>
        </div>
        <div class="p-2 border border-red-500/20 bg-red-950/20">
          <div class="text-[8px] text-red-600 uppercase mb-1">Fatal_Errors</div>
          <div class="text-lg font-bold text-red-400">{{ errorCount }}</div>
        </div>
      </div>

      <div class="w-full p-3 border-t border-cyan-500/20">
        <div class="flex items-center gap-2 mb-2">
           <div class="w-1 h-1 bg-cyan-500 animate-pulse"></div>
           <span class="text-[9px] text-cyan-500 uppercase tracking-wider">Live_Feed</span>
        </div>
        <div class="h-16 overflow-hidden text-[9px] text-cyan-700 font-mono space-y-1">
          <div *ngIf="successCount > 0">> [OK] Data packet secured.</div>
          <div *ngIf="errorCount > 0" class="text-red-800">> [ERR] Connection interrupt.</div>
          <div class="opacity-50">... Monitoring frequencies</div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MissionSummaryComponent {
  @Input() completionRate = 0;
  @Input() successCount = 0;
  @Input() warningCount = 0;
  @Input() errorCount = 0;
}
