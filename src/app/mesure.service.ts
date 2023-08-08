import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Mesure } from "./mesure";
import { Client } from "./client";

@Injectable({
    providedIn:'root'
})

export class MesureService{
    private baseURL="http://localhost:8080/api/mesure"

    constructor(private httpClient:HttpClient){}
        addMesure(mesure: Mesure): Observable<Mesure> {
          console.log(mesure)
            return this.httpClient.post<Mesure>(`${this.baseURL}/add-mesure`, mesure);
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
            return this.httpClient.put<Mesure>(url, mesure);
          }
    }