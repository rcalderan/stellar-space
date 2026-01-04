import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BackupComponent } from './features/backup/backup.component';
import { DocumentationComponent } from './features/docs/docs.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'backup', component: BackupComponent },
    { path: 'docs', component: DocumentationComponent },
    { path: 'oauth2callback', redirectTo: '', pathMatch: 'full' },
    { path: 'callback', redirectTo: '', pathMatch: 'full' }
];
