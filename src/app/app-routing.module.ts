import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
//import { DefaultComponent } from './default.component';
//import { CountryComponent } from './country.component';

const routes: Routes = [
/*  {
    path: '',
    redirectTo: '/default',
    pathMatch: 'full'
  },
  {
    path: 'default',
    component: DefaultComponent
  },
  {
    path: 'country',
    component: CountryComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
