import { Component } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Role } from '../role';
import { asapScheduler } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent {
  user=new User;
  forLogin:boolean=true;
  roleAdmin:string="ROLE_ADMIN";
  roleUser:string="ROLE_USER";
  roleModerator:string="ROLE_MODERATOR";
  typeRoles:string[]=[this.roleAdmin,this.roleModerator,this.roleUser];
  roles:string[]=[];
  constructor(private router: Router,private auhtService:AuthService){
    this.forLogin=true;
  }
  ngOnInit(){
    this.forLogin=true;
    console.log(this.forLogin)
  }
  signup(){
    var signed:boolean;
    this.auhtService.signup(this.user.username,this.user.email,this.user.password,this.roles).subscribe((res)=>{
      if(res.status=200){
        alert('Enrégistré avec succès')
        this.goToLogin();
      }
      else {
        console.log(res);
        alert(res.body.message);
      }
    })
  }
  login(){
    console.log(this.user)
    this.auhtService.login(this.user.username,this.user.password).subscribe((res) => {
      console.log(res)
      alert('Enrégistré avec succès!')
      this.router.navigate(['/']);
    }
    )
  }
  goToSignup(){
    console.log('sign up')
    this.forLogin=false;
  }
  goToLogin(){
    this.forLogin=true;
  }

  addRole(role:number){
    if(this.roles.find((t_role)=>t_role===this.typeRoles[role])){
      this.roles.splice(role);
      console.log('deleted');
      alert('role ' +this.typeRoles[role] +' retiré')
    }
    else{
      this.roles.push(this.typeRoles[role]);
      console.log('ajouté');
      console.log(role)
      console.log(this.typeRoles[3]);
      alert('role ' +this.typeRoles[role] +' ajouté')
    }
    console.log(this.roles)
    console.log(this.user)
  }
}
