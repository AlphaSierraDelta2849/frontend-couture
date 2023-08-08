import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-list-personne',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.less']
})
export class ListClientComponent implements OnInit{
  clients!: Client[];
  constructor(private clientService:ClientService, private router:Router){

  }
  ngOnInit(): void {
    console.log('inited');
    this.getPersonnes();
  }

  private getPersonnes(){
    this.clientService.getClientsList().subscribe((data)=>{console.dir(data);
      this.clients=data
    })
  }

  editUser(id: number) {
    // Implement the logic to navigate to the edit user form
  }

  deleteUser(id: number) {
    if (confirm('Voulez-vous supprimer le client nméro: '+id+'?')) {
      this.clientService.deleteUser(id).subscribe(
        () => {
          this.clients = this.clients.filter(client => client.id !== id);
        },
      );
    }
  }
  personneDetails(id:number){
    this.router.navigate(['personne-details',id]);
  }

  updatePersonne(id:number){
    this.router.navigate(['update-personne',id]);
  }
  navigateToEditUser(id: number) {
    // Use the router.navigate() method to navigate to the edit user form
    this.router.navigate(['/clients', id, 'edit']);
  }
  // deletePersonne(id:number){
  //   this.clientService.deletePersonne(id).subscribe({data=>
  //     console.log(data);
  //     this.getPersonnes();}
  //     )
  // }
}
