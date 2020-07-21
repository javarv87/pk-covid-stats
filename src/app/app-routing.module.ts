import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'general',
    redirectTo: '/general',
    pathMatch: 'full'
  },
  {
    path: 'general',
    component: GeneralComponent
  },
  {
    path: 'country',
    component: CountryComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
