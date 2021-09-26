import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VuttrCRUDComponent } from './vuttr-crud/vuttr-crud.component';

const routes: Routes = [
  {path:'vuttr', component:VuttrCRUDComponent},
  {path:'', redirectTo:'vuttr', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
