import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewcontactsComponent } from './viewcontacts/viewcontacts.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: 'viewcontacts',
    component: ViewcontactsComponent
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
