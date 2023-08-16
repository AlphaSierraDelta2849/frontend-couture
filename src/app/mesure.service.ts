import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mesure } from "./mesure";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn:'root'
})

export class MesureService{
  private authToken: string | null;
    private baseURL="http://localhost:8080/api/mesure";
    private headers:HttpHeaders;
    
    constructor(private httpClient:HttpClient,private authService: AuthService){
      this.authToken = this.authService.getToken(); // Get token from the authentication service
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      });
  
    }
        addMesure(mesure: Mesure): Observable<Mesure> {
          console.log(mesure)
            return this.httpClient.post<Mesure>(`${this.baseURL}/add-mesure`, mesure,{headers:this.headers});
        }
          saveMesure(mesure: Mesure): Observable<Mesure> {
            if (mesure?.id) {
              return this.updateMesure(mesure);
              
            } else {
              return this.addMesure(mesure);
            }
          }
          getMesure(id: number): Observable<Mesure> {
            return this.httpClient.get<Mesure>(`${this.baseURL}/${id}`);
          }
          updateMesure(mesure: Mesure): Observable<Mesure> {
            const url = `${this.baseURL}/edit`;
            return this.httpClient.put<Mesure>(url, mesure,{headers:this.headers});
          }
    }