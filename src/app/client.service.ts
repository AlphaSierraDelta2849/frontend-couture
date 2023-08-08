import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Client } from "./client";

@Injectable({
    providedIn:'root'
})

export class ClientService{
    private baseURL="http://localhost:8080/api/v1"

    constructor(private httpClient:HttpClient){}
        getClientsList(): Observable<Client[]>{
            return this.httpClient.get<Client[]>(`${this.baseURL}/persons`)
        }
        postClient(Client: Client): Observable<Client> {
            return this.httpClient.post<Client>(`${this.baseURL}/add-person`, Client);
        }
        getUser(id: number): Observable<Client> {
            return this.httpClient.get<Client>(`${this.baseURL}/person/${id}`);
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
            return this.httpClient.put<Client>(url, Client);
          }
          deleteUser(id: number): Observable<void> {
            return this.httpClient.delete<void>(`${this.baseURL}/delete/${id}`);
          }
    }