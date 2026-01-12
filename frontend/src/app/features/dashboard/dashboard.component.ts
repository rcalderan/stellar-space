import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { StellarBackgroundComponent } from '../../shared/components/stellar-background.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, StellarBackgroundComponent],
    template: `
    <div class="dashboard-container">
      <app-stellar-background></app-stellar-background>
      
      <!-- Main HUD Container -->
      <div class="dashboard-content">
        
        <!-- PHASE 2: Header & Navigation Menu -->
        <header class="header">
          <div class="header-left">
            <div class="logo">
              <div class="logo-icon">SS</div>
              <h1 class="logo-text">STELLAR SPACE</h1>
            </div>
            <nav class="nav">
              <a href="#" class="nav-link active">DASHBOARD</a>
              <a href="#" class="nav-link">MISSIONS</a>
              <a href="#" class="nav-link">DATA</a>
              <a href="#" class="nav-link">INTEGRATIONS</a>
            </nav>
          </div>
          
          <div class="header-right">
            <div class="search-container">
              <input type="text" placeholder="SEARCH_SYSTEM..." class="search-input">
              <span class="search-icon">🔍</span>
            </div>
            <div class="header-actions">
              <div class="notification">
                <span class="notification-icon">🔔</span>
                <span class="notification-badge"></span>
              </div>
              <div class="user-profile">
                <div class="user-info">
                  <div class="user-name">COMMANDER TYRELL</div>
                  <div class="user-rank">RANK: ALPHA_ONE</div>
                </div>
                <div class="user-avatar">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrell" alt="Avatar">
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <!-- Page Grid -->
        <main class="dashboard-grid">
          
          <!-- PHASE 3: Left Column (Integrations) -->
          <section class="column-left">
            <div class="column-header">
              <h2 class="column-title">INTEGRATIONS</h2>
              <span class="column-badge">ACTIVE_UPLINKS: {{ (auth.isGoogleAuthenticated() ? 1 : 0) + (auth.isMicrosoftAuthenticated() ? 1 : 0) }}</span>
            </div>
            
            <!-- Google Drive Integration -->
            <div class="glass-card integration-card" (click)="auth.loginGoogle()">
              <div class="integration-header">
                <div class="integration-info">
                  <div class="status-ring">
                    <svg viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#1e293b" stroke-width="2"></circle>
                      <circle cx="18" cy="18" r="16" fill="none" 
                              [attr.stroke]="auth.isGoogleAuthenticated() ? '#06b6d4' : '#334155'" 
                              stroke-width="2" 
                              [attr.stroke-dasharray]="auth.isGoogleAuthenticated() ? '100, 100' : '20, 100'"
                              transform="rotate(-90 18 18)"></circle>
                    </svg>
                    <span class="status-icon" [class.active]="auth.isGoogleAuthenticated()">G</span>
                  </div>
                  <div>
                    <div class="integration-name">DATA LINK: ALPHA CENTAURI</div>
                    <div class="integration-provider">PROVIDER: GOOGLE_DRIVE</div>
                  </div>
                </div>
                <div class="status-badge" [class.connected]="auth.isGoogleAuthenticated()">
                  {{ auth.isGoogleAuthenticated() ? 'CONNECTED' : 'OFFLINE' }}
                </div>
              </div>
              <div class="integration-signal">
                <span>SIGNAL_STRENGTH:</span>
                <span [class.strong]="auth.isGoogleAuthenticated()">{{ auth.isGoogleAuthenticated() ? 'LOCKED' : 'NO_SIGNAL' }}</span>
              </div>
            </div>

            <!-- OneDrive Integration -->
            <div class="glass-card integration-card" (click)="auth.loginMicrosoft()">
              <div class="integration-header">
                <div class="integration-info">
                  <div class="status-ring">
                    <svg viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#1e293b" stroke-width="2"></circle>
                      <circle cx="18" cy="18" r="16" fill="none" 
                              [attr.stroke]="auth.isMicrosoftAuthenticated() ? '#06b6d4' : '#334155'" 
                              stroke-width="2" 
                              [attr.stroke-dasharray]="auth.isMicrosoftAuthenticated() ? '100, 100' : '0, 100'"
                              transform="rotate(-90 18 18)"></circle>
                    </svg>
                    <span class="status-icon" [class.active]="auth.isMicrosoftAuthenticated()">M</span>
                  </div>
                  <div>
                    <div class="integration-name">STAR CHART API: ORION</div>
                    <div class="integration-provider">PROVIDER: ONEDRIVE</div>
                  </div>
                </div>
                <div class="status-badge" [class.connected]="auth.isMicrosoftAuthenticated()">
                  {{ auth.isMicrosoftAuthenticated() ? 'CONNECTED' : 'OFFLINE' }}
                </div>
              </div>
              <div class="integration-signal">
                <span>SIGNAL_STRENGTH:</span>
                <span [class.strong]="auth.isMicrosoftAuthenticated()">{{ auth.isMicrosoftAuthenticated() ? 'LOCKED' : 'NO_SIGNAL' }}</span>
              </div>
            </div>

            <!-- Deep Space Network -->
            <div class="glass-card integration-card disabled">
              <div class="integration-header">
                <div class="integration-info">
                  <div class="status-ring">
                    <svg viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#1e293b" stroke-width="2"></circle>
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#d946ef" stroke-width="2" stroke-dasharray="40, 100" transform="rotate(-90 18 18)"></circle>
                    </svg>
                    <span class="status-icon error">V</span>
                  </div>
                  <div>
                    <div class="integration-name">DEEP SPACE NETWORK: VOYAGER</div>
                    <div class="integration-provider">PROVIDER: UNKNOWN</div>
                  </div>
                </div>
                <div class="status-badge error">DISCONNECTED</div>
              </div>
              <div class="integration-signal">
                <span>SIGNAL_STRENGTH:</span>
                <span class="error">LOST_CONTACT</span>
              </div>
            </div>

            <button class="add-integration-btn">+ ADD NEW INTEGRATION</button>
          </section>

          <!-- PHASE 5: Center Column (Migration Hub) -->
          <section class="column-center">
            <div class="column-header">
              <h2 class="column-title">MIGRATION HUB</h2>
              <div class="hub-stats">
                <span class="stat-cyan">DL: 1.2 GB/S</span>
                <span class="stat-magenta">UL: 980 MB/S</span>
              </div>
            </div>
            
            <div class="glass-card hub-card">
              <!-- Tabs -->
              <div class="hub-tabs">
                <button class="hub-tab active">ALL FILES</button>
                <button class="hub-tab">DOWNLOADING</button>
                <button class="hub-tab">UPLOADING</button>
                <button class="hub-tab">COMPLETED</button>
                <button class="hub-tab">FAILED</button>
                <div class="tab-search">
                  <input type="text" placeholder="SEARCH...">
                  <span>🔍</span>
                </div>
              </div>

              <!-- File List -->
              <div class="hub-files">
                <!-- File 1 -->
                <div class="file-item">
                  <div class="file-header">
                    <div class="file-info">
                      <div class="file-icon">📹</div>
                      <div>
                        <div class="file-name">File: Nebula_Scan_HD_01.mp4</div>
                        <div class="file-meta">SIZE: 4.2 GB | TYPE: VIDEO/MP4</div>
                      </div>
                    </div>
                    <div class="file-controls">
                      <button class="file-btn">▶️</button>
                      <button class="file-btn">⏸️</button>
                    </div>
                  </div>
                  <div class="file-progress">
                    <div class="progress-info">
                      <span class="progress-label cyan">DOWNLOAD: 85%</span>
                      <span class="progress-speed">1.2 GB/S</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill cyan" style="width: 85%"></div>
                    </div>
                  </div>
                  <div class="file-progress">
                    <div class="progress-info">
                      <span class="progress-label magenta">UPLOAD: 60%</span>
                      <span class="progress-speed">980 MB/S</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill magenta" style="width: 60%"></div>
                    </div>
                  </div>
                </div>

                <!-- File 2 (Completed) -->
                <div class="file-item completed">
                  <div class="file-header">
                    <div class="file-info">
                      <div class="file-icon success">✅</div>
                      <div>
                        <div class="file-name">File: Exoplanet_Atmosphere_4K.mov</div>
                        <div class="file-meta">SIZE: 12.8 GB | TYPE: VIDEO/QUICKTIME</div>
                      </div>
                    </div>
                    <div class="file-status success">COMPLETED</div>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill success" style="width: 100%"></div>
                  </div>
                </div>

                <!-- File 3 (Failed) -->
                <div class="file-item">
                  <div class="file-header">
                    <div class="file-info">
                      <div class="file-icon error">⚠️</div>
                      <div>
                        <div class="file-name">File: Starship_Telemetry_Log_2024.csv</div>
                        <div class="file-meta">SIZE: 156 KB | TYPE: TEXT/CSV</div>
                      </div>
                    </div>
                    <button class="retry-btn">RETRY</button>
                  </div>
                  <div class="file-error">ERROR: UPLINK_INTERRUPTED_BY_SOLAR_FLARE</div>
                </div>
              </div>
            </div>
          </section>

          <!-- PHASE 4: Right Column (Mission Summary) -->
          <section class="column-right">
            <div class="column-header">
              <h2 class="column-title">MISSION SUMMARY</h2>
              <span class="column-badge error">STATUS: CRITICAL</span>
            </div>
            
            <div class="glass-card summary-card">
              <!-- Telemetry Gauge -->
              <div class="telemetry">
                <svg class="gauge" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" stroke-width="4"></circle>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#06b6d4" stroke-width="4" 
                          stroke-dasharray="220, 283" stroke-linecap="round" 
                          transform="rotate(-90 50 50)" class="gauge-progress"></circle>
                </svg>
                <div class="gauge-center">
                  <div class="gauge-value">78%</div>
                  <div class="gauge-label">COMPLETE</div>
                </div>
              </div>

              <!-- Status Counters -->
              <div class="counters">
                <div class="counter success">
                  <div class="counter-value">3</div>
                  <div class="counter-label">Success</div>
                </div>
                <div class="counter warning">
                  <div class="counter-value">1</div>
                  <div class="counter-label">Warning</div>
                </div>
                <div class="counter error">
                  <div class="counter-value">1</div>
                  <div class="counter-label">Failed</div>
                </div>
              </div>

              <!-- Recent Activities -->
              <div class="activities">
                <h3 class="activities-title">Recent Activities</h3>
                <div class="activity-item">
                  <span>Data Transfer to Earth-One:</span>
                  <span class="success">SUCCESS</span>
                </div>
                <div class="activity-item">
                  <span>Probe Deployment:</span>
                  <span class="warning">WARNING (SIGNAL WEAK)</span>
                </div>
                <div class="activity-item">
                  <span>System Update:</span>
                  <span class="success">SUCCESS</span>
                </div>
              </div>

              <!-- Execute Button -->
              <button class="execute-btn">
                <div class="btn-content">
                  <span class="btn-icon">🚀</span>
                  <div>
                    <div class="btn-title">EXECUTE STELLAR MIGRATION</div>
                    <div class="btn-timer">T-MINUS 04:32:10</div>
                  </div>
                </div>
              </button>
            </div>
          </section>

        </main>
      </div>
    </div>
  `,
    styles: [`
    :host { display: block; }
    
    .dashboard-container {
      min-height: 100vh;
      position: relative;
      overflow: hidden;
      background-color: #030508;
      color: #f8fafc;
    }
    
    .dashboard-content {
      position: relative;
      z-index: 10;
      padding: 1.5rem;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    /* Header Styles */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex-wrap: wrap;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .logo-icon {
      width: 2.5rem;
      height: 2.5rem;
      background: linear-gradient(to bottom right, #06b6d4, #d946ef);
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.25rem;
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
    }
    
    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      color: #06b6d4;
      text-shadow: 0 0 8px rgba(6, 182, 212, 0.5);
      margin: 0;
    }
    
    .nav {
      display: none;
      align-items: center;
      gap: 1.5rem;
    }
    
    @media (min-width: 1024px) {
      .nav {
        display: flex;
      }
    }
    
    .nav-link {
      font-size: 0.875rem;
      font-weight: 500;
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.2s;
      position: relative;
      padding-bottom: 0.25rem;
    }
    
    .nav-link:hover {
      color: #e2e8f0;
    }
    
    .nav-link.active {
      color: #06b6d4;
      border-bottom: 2px solid #06b6d4;
    }
    
    .header-right {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .search-container {
      display: none;
      position: relative;
    }
    
    @media (min-width: 768px) {
      .search-container {
        display: block;
      }
    }
    
    .search-input {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid #334155;
      border-radius: 9999px;
      padding: 0.5rem 1rem 0.5rem 2.5rem;
      font-size: 0.75rem;
      color: #f8fafc;
      width: 16rem;
      outline: none;
      transition: border-color 0.2s;
    }
    
    .search-input:focus {
      border-color: rgba(6, 182, 212, 0.5);
    }
    
    .search-input::placeholder {
      color: #64748b;
    }
    
    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #64748b;
      font-size: 0.75rem;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .notification {
      position: relative;
      cursor: pointer;
    }
    
    .notification-icon {
      font-size: 1.25rem;
    }
    
    .notification-badge {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.5rem;
      height: 0.5rem;
      background: #ef4444;
      border-radius: 50%;
      border: 1px solid #030508;
    }
    
    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding-left: 1rem;
      border-left: 1px solid #1e293b;
    }
    
    .user-info {
      display: none;
      text-align: right;
    }
    
    @media (min-width: 640px) {
      .user-info {
        display: block;
      }
    }
    
    .user-name {
      font-size: 0.75rem;
      font-weight: 700;
    }
    
    .user-rank {
      font-size: 0.625rem;
      color: rgba(6, 182, 212, 0.7);
      font-family: 'JetBrains Mono', monospace;
    }
    
    .user-avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 2px solid rgba(6, 182, 212, 0.3);
      padding: 0.125rem;
    }
    
    .user-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #1e293b;
    }
    
    .dashboard-grid {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1.5rem;
      overflow: hidden;
    }
    
    .column-left {
      grid-column: span 12;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .column-center {
      grid-column: span 12;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .column-right {
      grid-column: span 12;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    @media (min-width: 1024px) {
      .column-left {
        grid-column: span 3;
      }
      
      .column-center {
        grid-column: span 6;
      }
      
      .column-right {
        grid-column: span 3;
      }
    }
    
    .placeholder-card {
      flex: 1;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px dashed rgba(6, 182, 212, 0.2);
    }
    
    .placeholder-text {
      color: rgba(6, 182, 212, 0.5);
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
    }
    
    /* Column Headers */
    .column-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .column-title {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #64748b;
      margin: 0;
    }
    
    .column-badge {
      font-size: 0.625rem;
      font-family: 'JetBrains Mono', monospace;
      color: #06b6d4;
    }
    
    .column-badge.error {
      color: #d946ef;
    }
    
    /* Integration Cards */
    .integration-card {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .integration-card:hover:not(.disabled) {
      border-color: rgba(6, 182, 212, 0.4);
    }
    
    .integration-card.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .integration-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    
    .integration-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
      min-width: 0;
    }
    
    .status-ring {
      width: 3rem;
      height: 3rem;
      position: relative;
      flex-shrink: 0;
    }
    
    .status-ring svg {
      width: 100%;
      height: 100%;
    }
    
    .status-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.125rem;
      font-weight: 700;
      color: #475569;
    }
    
    .status-icon.active {
      color: #06b6d4;
    }
    
    .status-icon.error {
      color: #d946ef;
    }
    
    .integration-name {
      font-size: 0.75rem;
      font-weight: 700;
    }
    
    .integration-provider {
      font-size: 0.625rem;
      color: #64748b;
      font-family: 'JetBrains Mono', monospace;
    }
    
    .status-badge {
      font-size: 0.625rem;
      font-weight: 700;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      border: 1px solid #334155;
      color: #64748b;
      white-space: nowrap;
    }
    
    .status-badge.connected {
      border-color: rgba(16, 185, 129, 0.5);
      color: #10b981;
      background: rgba(16, 185, 129, 0.1);
    }
    
    .status-badge.error {
      border-color: rgba(217, 70, 239, 0.5);
      color: #d946ef;
      background: rgba(217, 70, 239, 0.1);
    }
    
    .integration-signal {
      display: flex;
      justify-content: space-between;
      font-size: 0.625rem;
      font-family: 'JetBrains Mono', monospace;
      color: #64748b;
    }
    
    .integration-signal span.strong {
      color: #10b981;
    }
    
    .integration-signal span.error {
      color: #d946ef;
    }
    
    .add-integration-btn {
      width: 100%;
      padding: 0.75rem;
      border-radius: 0.75rem;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid #334155;
      color: #64748b;
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .add-integration-btn:hover {
      border-color: rgba(6, 182, 212, 0.5);
      color: #06b6d4;
    }
    
    /* Hub Card */
    .hub-card {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 0;
    }
    
    .hub-stats {
      display: flex;
      gap: 1rem;
      font-size: 0.625rem;
      font-family: 'JetBrains Mono', monospace;
    }
    
    .stat-cyan { color: #06b6d4; }
    .stat-magenta { color: #d946ef; }
    
    .hub-tabs {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid #1e293b;
      overflow-x: auto;
    }
    
    .hub-tab {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #64748b;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem 0;
      white-space: nowrap;
      transition: color 0.2s;
      border-bottom: 2px solid transparent;
    }
    
    .hub-tab:hover {
      color: #cbd5e1;
    }
    
    .hub-tab.active {
      color: #06b6d4;
      border-bottom-color: #06b6d4;
    }
    
    .tab-search {
      position: relative;
      margin-left: auto;
    }
    
    .tab-search input {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid #334155;
      border-radius: 0.25rem;
      padding: 0.25rem 0.75rem 0.25rem 2rem;
      font-size: 0.625rem;
      color: #f8fafc;
      width: 8rem;
      outline: none;
    }
    
    .tab-search input:focus {
      border-color: rgba(6, 182, 212, 0.5);
    }
    
    .tab-search span {
      position: absolute;
      left: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.625rem;
    }
    
    .hub-files {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .file-item {
      background: rgba(15, 23, 42, 0.3);
      border: 1px solid #1e293b;
      border-radius: 0.75rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      transition: border-color 0.2s;
    }
    
    .file-item:hover {
      border-color: rgba(6, 182, 212, 0.3);
    }
    
    .file-item.completed {
      opacity: 0.8;
    }
    
    .file-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    
    .file-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
      min-width: 0;
    }
    
    .file-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.5rem;
      background: linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), rgba(217, 70, 239, 0.2));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      flex-shrink: 0;
    }
    
    .file-icon.success {
      background: rgba(16, 185, 129, 0.1);
    }
    
    .file-icon.error {
      background: rgba(239, 68, 68, 0.1);
    }
    
    .file-name {
      font-size: 0.75rem;
      font-weight: 700;
    }
    
    .file-meta {
      font-size: 0.625rem;
      color: #64748b;
      font-family: 'JetBrains Mono', monospace;
    }
    
    .file-controls {
      display: flex;
      gap: 0.5rem;
    }
    
    .file-btn {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: #1e293b;
      border: none;
      cursor: pointer;
      font-size: 0.75rem;
      transition: background 0.2s;
    }
    
    .file-btn:hover {
      background: #334155;
    }
    
    .file-progress {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .progress-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.625rem;
      font-family: 'JetBrains Mono', monospace;
    }
    
    .progress-label.cyan { color: #06b6d4; }
    .progress-label.magenta { color: #d946ef; }
    
    .progress-speed {
      color: #64748b;
    }
    
    .progress-bar {
      height: 0.375rem;
      background: #1e293b;
      border-radius: 9999px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      transition: width 0.3s;
    }
    
    .progress-fill.cyan {
      background: #06b6d4;
      box-shadow: 0 0 8px rgba(6, 182, 212, 0.5);
    }
    
    .progress-fill.magenta {
      background: #d946ef;
      box-shadow: 0 0 8px rgba(217, 70, 239, 0.5);
    }
    
    .progress-fill.success {
      background: #10b981;
    }
    
    .file-status {
      font-size: 0.625rem;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
    }
    
    .file-status.success {
      color: #10b981;
    }
    
    .retry-btn {
      font-size: 0.625rem;
      font-weight: 700;
      background: #1e293b;
      border: none;
      padding: 0.25rem 0.75rem;
      border-radius: 0.25rem;
      cursor: pointer;
      color: #f8fafc;
      transition: background 0.2s;
    }
    
    .retry-btn:hover {
      background: #334155;
    }
    
    .file-error {
      font-size: 0.625rem;
      color: #ef4444;
      font-family: 'JetBrains Mono', monospace;
    }
    
    /* Summary Card */
    .summary-card {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .telemetry {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 0;
    }
    
    .gauge {
      width: 12rem;
      height: 12rem;
    }
    
    .gauge-progress {
      filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.5));
    }
    
    .gauge-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
    
    .gauge-value {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.025em;
    }
    
    .gauge-label {
      font-size: 0.625rem;
      color: #64748b;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
    
    .counters {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
    }
    
    .counter {
      background: rgba(15, 23, 42, 0.5);
      border-radius: 0.5rem;
      padding: 0.5rem;
      text-align: center;
      border: 1px solid;
    }
    
    .counter.success {
      border-color: rgba(16, 185, 129, 0.2);
    }
    
    .counter.warning {
      border-color: rgba(245, 158, 11, 0.2);
    }
    
    .counter.error {
      border-color: rgba(239, 68, 68, 0.2);
    }
    
    .counter-value {
      font-size: 0.875rem;
      font-weight: 700;
    }
    
    .counter.success .counter-value { color: #10b981; }
    .counter.warning .counter-value { color: #f59e0b; }
    .counter.error .counter-value { color: #ef4444; }
    
    .counter-label {
      font-size: 0.5rem;
      color: #64748b;
      text-transform: uppercase;
    }
    
    .activities {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .activities-title {
      font-size: 0.625rem;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin: 0;
    }
    
    .activity-item {
      display: flex;
      justify-content: space-between;
      font-size: 0.625rem;
      font-family: 'JetBrains Mono', monospace;
      color: #64748b;
      gap: 0.5rem;
    }
    
    .activity-item span.success { color: #10b981; }
    .activity-item span.warning { color: #f59e0b; }
    
    .execute-btn {
      width: 100%;
      padding: 0.25rem;
      border-radius: 0.75rem;
      background: linear-gradient(to right, #0e7490, #a21caf);
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .execute-btn:hover {
      transform: scale(1.02);
    }
    
    .execute-btn:active {
      transform: scale(0.98);
    }
    
    .btn-content {
      background: rgba(3, 5, 8, 0.9);
      border-radius: 0.625rem;
      padding: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      transition: background 0.2s;
    }
    
    .execute-btn:hover .btn-content {
      background: transparent;
    }
    
    .btn-icon {
      font-size: 1.25rem;
    }
    
    .btn-title {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-align: left;
    }
    
    .btn-timer {
      font-size: 0.5rem;
      color: #06b6d4;
      font-family: 'JetBrains Mono', monospace;
      text-align: left;
    }
  `]
})
export class DashboardComponent implements OnInit {
    constructor(public auth: AuthService) { }
    ngOnInit() { }
}
