import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-5xl mx-auto pt-10 px-6 pb-20 font-mono">
      <div class="flex items-center gap-4 mb-10 border-b border-cyan-500/20 pb-4">
        <span class="text-3xl text-cyan-500">?</span>
        <h1 class="text-2xl font-bold text-cyan-50 uppercase tracking-[0.3em]">System_Manual</h1>
      </div>
      
      <div class="space-y-6">
        <section class="p-6 border border-cyan-500/20 bg-cyan-950/10 relative">
          <div class="absolute -top-1 -left-1 w-2 h-2 bg-cyan-500"></div>
          <div class="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-500"></div>
          
          <h2 class="text-sm font-bold mb-6 text-cyan-400 uppercase tracking-widest border-b border-cyan-500/10 pb-2 w-fit">Module 01: Google_Link</h2>
          <p class="text-cyan-100/70 text-xs mb-4 leading-relaxed max-w-2xl">To establish a secure upline, the following protocols must be active in the Google Cloud Console:</p>
          <ul class="space-y-2 text-xs text-cyan-500/80 mb-6 pl-4 border-l border-cyan-500/20">
            <li class="flex items-center gap-2"><span>></span> Google Drive API</li>
            <li class="flex items-center gap-2"><span>></span> YouTube Data API v3</li>
          </ul>
          <div class="p-3 bg-black border border-cyan-500/30 text-[10px] text-cyan-300">
            <span class="text-cyan-700 select-none">AUTH_URI: </span>http://localhost:4201/oauth2callback
          </div>
        </section>

        <section class="p-6 border border-gray-800 bg-black/40 grayscale opacity-60">
          <h2 class="text-sm font-bold mb-4 text-gray-400 uppercase tracking-widest">Module 02: MS_Graph</h2>
          <p class="text-xs text-gray-500">[ LOCKED ] Subsystem currently in development cycle.</p>
        </section>
      </div>
    </div>
  `,
  styles: []
})
export class DocumentationComponent { }
