import { Component, Input } from '@angular/core';
import { ParkingContractComponent } from './ParkingContract.component';
import { BedrijfService } from '../services/bedrijf.service';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-bedrijfselect',
  template: `
    <div class="container flex flex-col justify-center items-center mx-auto">
      <div class="flex items-center mb-6 -mt-40">
        <h2 class="text-center -ml-12">Bedrijf:</h2>
        <select [(ngModel)]="selectedOption" (change)="onOptionSelect()" class="text-center mr-5 bedrijf-select ml-2 content-center bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block p-2.5 dark:bg-gray-400 hover:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-gray-500" style="margin-left: 1.5rem;">
          <option [style.background-color]="'gray'"  value="{{ defaultOption }}">{{ defaultOption }}</option>
          <option *ngFor="let bedrijf of bedrijven" [value]="bedrijf.id">{{ bedrijf.naam }}</option>
        </select>
      </div>

  <div class="flex items-center mb-6 -ml-80 border bg-gray-200 rounded-lg">
    <button [routerLink]="'/nieuwbedrijf'" class="text-center mr-5 bedrijf-select ml-2 content-center bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block p-2.5 dark:bg-gray-400 hover:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-gray-500">Nieuw bedrijf</button>
    <button (click)="navigateToWijzigBedrijf()" class="text-center mr-5 bedrijf-select ml-2 content-center bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block p-2.5 dark:bg-gray-400 hover:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-gray-500">Wijzig bedrijf</button>
    <button [routerLink]="'/allebezoekers'" class="text-center mr-5 bedrijf-select ml-2 content-center bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block p-2.5 dark:bg-gray-400 hover:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-gray-500">Alle bezoekers</button>
  </div>

      <div class="flex items-center mb-10 -ml-16 -mt-40">
        <h2 class="text-center ml-11 mt-5">Bezoekers: &nbsp;</h2>
        <h3 class="mt-5 text-center mx-auto h-10 w-20 bg-gray-400 text-white border-gray-300 rounded-lg"
        *ngIf="bezoekersInBedrijf.length > 0">
      &nbsp; {{ bezoekersInBedrijf.length }} &nbsp;
      </h3>
      <h3 class="mt-5 text-center mx-auto h-10 w-20 bg-gray-400 text-white border-gray-300 rounded-lg"
          *ngIf="bezoekersInBedrijf.length === 0">
        &nbsp; &nbsp;
      </h3>

      </div>
    </div>
    <app-datagrid [bezoekers]="bezoekersInBedrijf"></app-datagrid>
    <app-parkingcontract [parkingPlaatsen]="parkingContract.aantalPlaatsen"></app-parkingcontract>
  `,
  styles: [],
})
export class BedrijfSelectComponent {

  defaultOption = "Selecteer een bedrijf...";
  selectedOption: number = 0;
  bedrijven: any[] = [];
  bedrijf: any = {};
  bezoekersInBedrijf: any = '';
  parkingContract: any = {}; 

  constructor(private bedrijfService: BedrijfService, private router: Router) {
  }

  ngOnInit() {
    this.fetchBedrijven();
  }

  fetchBedrijven() {
    this.bedrijfService.getBedrijven().subscribe({
      next: (response) => {
        this.bedrijven = response.map(bedrijf => ({
          id: bedrijf.id,
          naam: bedrijf.naam,
          btwNummer: bedrijf.btwNummer,
          adres: bedrijf.adres,
          telefoonNr: bedrijf.telefoonNr,
          email: bedrijf.email,
          status: bedrijf.status,
        }));
      },
      error: (error) => {
        console.error('Error fetching options:', error);
      }
    });
  }  
  
  fetchBezoekersInBedrijf(bedrijfId: number) {
    this.bedrijfService.getBezoekersInBedrijf(bedrijfId).subscribe({
      next: (response) => {
        this.bezoekersInBedrijf = response.map((bezoeker: any) => ({
          id: bezoeker.id,
          voornaam: bezoeker.voornaam,
          achternaam: bezoeker.achternaam,
          email: bezoeker.email,
        }));
      },

      error: (error) => {
        console.error('Error fetching bezoekers:', error);
      }
    });
  }
  
  fetchParkingContractBedrijf(bedrijfId: number) {
    this.bedrijfService.getParkingContractBedrijf(bedrijfId).subscribe({
      next: (response) => {
        console.log('Response:', response);

        this.parkingContract = {
          id: response.id,
          bedrijfId: response.bedrijfId,
          startDatum: response.startDatum,
          eindDatum: response.eindDatum,
          aantalPlaatsen: response.aantalPlaatsen,
          aantalBezettePlaatsen: response.aantalBezettePlaatsen,
          status: response.status,
          locatie: response.locatie,
        };        
      },
      error: (error) => {
        console.error('Error fetching parking contracts:', error);
      }
    });
  }
  
  
  onOptionSelect() {
    console.log('Selected option:', this.selectedOption);
    this.fetchBezoekersInBedrijf(this.selectedOption);
    this.fetchParkingContractBedrijf(this.selectedOption);
  }

  navigateToWijzigBedrijf() {
    this.bedrijfService.getBedrijfById(this.selectedOption).subscribe({
      next: (response) => {
        this.bedrijf = response;
        console.log('bedrijf:', this.bedrijf);
        
        this.router.navigate(['/wijzigbedrijf'], { queryParams: { data: JSON.stringify(this.bedrijf) } });
      },
      error: (error) => {
        console.error('Error fetching bedrijf:', error);
      }
    });
      
    console.log(this.selectedOption);
  }  
}
