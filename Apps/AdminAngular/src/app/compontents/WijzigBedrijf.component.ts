import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BedrijfService } from '../services/bedrijf.service';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-wijzigbedrijf',
  template: `
    <h1 class="text-center mb-6">Bedrijf wijzigen</h1>
    <div class="flex flex-col justify-center items-center h-full">
      <div>
        <label for="bedrijfsnaam" class="font-semibold mt-5 block mb-2 text-sm text-gray-500">Bedrijfsnaam</label>
        <input type="text" id="bedrijfsnaam" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" [(ngModel)]="selectedOptionData.naam" required>

            <label for="btwnummer" class="block mb-2 text-sm font-semibold text-gray-500">BTW-nummer</label>
            <input type="text" id="btwnummer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" [(ngModel)]="selectedOptionData.btwNummer" required>

            <label for="adres" class="block mb-2 text-sm font-semibold text-gray-500">Adres</label>
            <input type="text" id="adres" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" [(ngModel)]="selectedOptionData.adres"  required>

            <label for="telnummer" class="block mb-2 text-sm font-semibold text-gray-500">Telefoonnummer</label>
            <input type="int" id="telnummer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" [(ngModel)]="selectedOptionData.telefoonNr" required>

            <label for="email" class="block mb-2 text-sm font-semibold text-gray-500">E-mail</label>
            <input type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" [(ngModel)]="selectedOptionData.email" required>

          </div>
        </div>
        <div class="flex flex-col justify-center items-center h-full">
          <button type="submit" (click)="updateBedrijf()" class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-5">OK</button>
          <button type="submit" (click)="verwijderBedrijf()" class="bg-red-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-2">Verwijder</button>
          <button [routerLink]="'/'" class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Terug</button>

    </div>
  `,
  styles: [],
})
export class WijzigBedrijfComponent implements OnInit {
    selectedOptionData: any;

  constructor(private route: ActivatedRoute, private bedrijfService: BedrijfService, private router: Router) { }

  ngOnInit() {
    const data = this.route.snapshot.queryParams['data'];
    this.selectedOptionData = JSON.parse(data);
    console.log(this.selectedOptionData); 
  }

  updateBedrijf() {
    this.bedrijfService.putBedrijf(this.selectedOptionData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error updating bedrijf:', error);
      }
    });
  }

  verwijderBedrijf() {
    this.bedrijfService.deleteBedrijf(this.selectedOptionData.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error deleting bedrijf:', error);
      }
    });
  }
}  
