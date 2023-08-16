import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from "./client";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn:'root'
})

export class ClientService{
    private baseURL="http://localhost:8080/api/v1"
    private authToken: string | null;
    private headers:HttpHeaders;
    constructor(private httpClient:HttpClient,private authService: AuthService){
      this.authToken = this.authService.getToken(); // Get token from the authentication service
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      });
    }
        getClientsList(): Observable<Client[]>{
          console.log(this.authService.getToken())
            return this.httpClient.get<Client[]>(`${this.baseURL}/persons`,{headers:{'Authorization': `Bearer ${this.authToken}`}})
        }
        postClient(Client: Client): Observable<Client> {
            return this.httpClient.post<Client>(`${this.baseURL}/add-person`, Client,{headers:this.headers});
        }
        getUser(id: number): Observable<Client> {
            return this.httpClient.get<Client>(`${this.baseURL}/person/${id}`,{headers:this.headers});
          }
        
          saveUser(Client: Client): Observable<Client> {
            if (Client.id) {
              return this.updateUser(Client);
              
            } else {
              return this.postClient(Client);
            }
          }
        
          updateUser(Client: Client): Observable<Client> {
            const url = `${this.baseURL}/edit/${Client.id}`;
            return this.httpClient.put<Client>(url, Client,{headers:this.headers});
          }
          deleteUser(id: number): Observable<void> {
            return this.httpClient.delete<void>(`${this.baseURL}/delete/${id}`,{headers:this.headers});
          }
    }