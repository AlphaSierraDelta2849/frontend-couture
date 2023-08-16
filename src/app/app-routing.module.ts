import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateclientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'clients',component:ListClientComponent,canActivate: [AuthGuard]},
  {path:'create-person',component:CreateclientComponent,canActivate: [AuthGuard]},
  { path: 'clients/:id/edit', component: CreateclientComponent,canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  {path:'',redirectTo:'clients',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
