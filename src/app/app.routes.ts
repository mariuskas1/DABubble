import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { MainPageComponent } from './main-page/main-page.component';


export const routes: Routes = [
    { path: '', component: LogInComponent},
    { path: 'main', component: MainPageComponent}
];
