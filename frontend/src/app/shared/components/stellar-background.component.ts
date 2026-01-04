import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stellar-background',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="stars-container">
      <div *ngFor="let star of stars" 
           class="star" 
           [style.left.%]="star.left" 
           [style.top.%]="star.top" 
           [style.width.px]="star.size"
           [style.height.px]="star.size"
           [style.--duration]="star.duration + 's'">
      </div>
    </div>
  `,
    styles: [`
    .stars-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 0;
      pointer-events: none;
    }
    
    .star {
      position: absolute;
      background: white;
      border-radius: 50%;
      opacity: 0.8;
      animation: twinkle var(--duration) ease-in-out infinite;
    }
    
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
  `]
})
export class StellarBackgroundComponent implements OnInit {
    stars: any[] = [];

    ngOnInit() {
        for (let i = 0; i < 150; i++) {
            this.stars.push({
                left: Math.random() * 100,
                top: Math.random() * 100,
                size: Math.random() * 3 + 1,
                duration: Math.random() * 3 + 2
            });
        }
    }
}
