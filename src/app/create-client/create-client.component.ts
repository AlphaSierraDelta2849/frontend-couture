import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { MesureService } from '../mesure.service';
import { Mesure } from '../mesure';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.less']
})
export class CreateclientComponent implements OnInit{
  client: Client = new Client;
  mesure:Mesure=new Mesure;
  constructor(private clientService: ClientService,private activatedRoute: ActivatedRoute,private router: Router,private mesureService:MesureService
    ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      // Retrieve the user data using the id
      this.clientService.getUser(id).subscribe(
        (client) => {
          this.client = client;
          // if(client.mesure)
          // this.mesure=client.mesure
        }
      );
      this.mesureService.getMesure(id).subscribe(
        (mesure)=>{
          if(mesure)
          this.mesure=mesure
        }
      )
    }
  }

  saveUser() {
    console.log(this.client)
    const resulVerif=this.verify(this.client)
      if(resulVerif==''){
      this.clientService.saveUser(this.client).subscribe(
        () => {
          this.router.navigate(['/clients']);
        }
      );}
      else
      alert(resulVerif);
    // this.router.navigate(['/clients']);
  }

  saveMesure(){
    console.log(this.mesure)
    this.client.mesure=undefined;
    this.mesure.client=this.client;
    this.mesureService.saveMesure(this.mesure).subscribe(()=>{
      this.router.navigate(['/clients']);
    })
  }
  verify(person:Client){
    console.log(person);
      if(!person.phone){
        return 'le numéro de téléphone est obligatoire!';
      }
      else if(!person.address){
        return 'l adresse est obligatoire!';
      }
      else return '';
  }
  // saveUser() {
  //   this.clientService.saveUser(this.client).subscribe(
  //     (user) => {
  //       console.log('User saved:', user);
  //       // Implement the logic to navigate to the user list or update the edited user
  //     }
  //   );
  // }
}
