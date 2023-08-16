import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/signin`, { username, password })
      .pipe(map(response => {
        console.log(response)
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.username);
        return response;
      }));
  }
  signup(username: string,email:string, password: string, role:string[]) {
    return this.http.post<any>(`${this.apiUrl}/signup`, { "username":username,"email":email,"password":password,"role":role })
      .pipe(map(response => {
        
        return response;
      }));
      
  }
  logout() {
    const headers = ({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
     return this.http.post<any>(`${this.apiUrl}/signout`, {},{headers})    
  }

  getToken() {
    console.log(localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
}
