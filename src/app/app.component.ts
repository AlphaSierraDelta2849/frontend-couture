import { Component } from '@angular/core';
import { User } from './user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'frontend';
  user:string | null='non Connecté';
  
  constructor(private authService: AuthService,private router: Router){
  }
  ngOnInit(){
    if(localStorage.getItem('user'))
    this.user=localStorage.getItem('user');
  }
  login(){
    this.router.navigate(['/auth']);
  }
  signup(){

  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
