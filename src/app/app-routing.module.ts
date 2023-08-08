import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateclientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';

const routes: Routes = [
  {path:'clients',component:ListClientComponent},
  {path:'create-person',component:CreateclientComponent},
  { path: 'clients/:id/edit', component: CreateclientComponent },
  {path:'',redirectTo:'clients',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
