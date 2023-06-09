import { Component, Input } from '@angular/core';
import { BedrijfService } from '../services/bedrijf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nieuwparkeercontract',
  template: `
  <h1 class="text-center mb-6">Parkeercontract aanmaken</h1>
  <div class="flex flex-col justify-center items-center h-full">
        <label for="bedrijf" class="block mb-2 text-sm font-semibold text-black">Bedrijf:</label>
        <select [(ngModel)]="selectedOption" (change)="onOptionSelect()" class="text-center mr-5 bedrijf-select ml-2 content-center bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block p-2.5 dark:bg-gray-400 hover:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-gray-500" style="margin-left: 1.5rem;">
          <option *ngFor="let bedrijf of bedrijven" [value]="bedrijf.id">{{ bedrijf.naam }}</option>
        </select>

        <label for="parkeerplaatsen" class="font-semibold mt-5 block mb-2 text-sm text-black">Aantal Parkeerplaatsen:</label>
            <input type="text" id="parkeerplaatsen" class="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 " pattern="[0-9]*" inputmode="numeric" [(ngModel)]="aantalPlaatsen">
            <label for="parkeerplaatsen" class="font-semibold mt-5 block mb-2 text-sm text-black">Locatie:</label>
            <input type="text" id="locatie" class="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 " pattern="[0-9]*" inputmode="numeric" [(ngModel)]="locatie">

            <label for="dates" class="font-semibold mt-5 block mb-2 text-sm text-black">Begin- en einddatum:</label>
            <div class="flex items-center">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <input name="start" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Select start date" [(ngModel)]="startDatum">
              </div>
              <span class="mx-4 text-gray-500">tot</span>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                </div>
                <input name="end" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Select end date" [(ngModel)]="eindDatum">
              </div>
            </div>
            <div class="flex flex-col justify-center items-center h-full">
              <button (click)="maakParkingcontractAan()" type="input" class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">OK</button>
              <button [routerLink]="'/'" class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Terug</button> 
            </div>
  `,
  styles: [],
})
export class NieuwParkeerContractComponent {
  defaultOption = "Selecteer een bedrijf...";
  selectedOption: number = 0;
  bedrijven: any[] = [];
  bedrijf: any = {};
  bezoekersInBedrijf: any = '';
  parkingContract: any = {}; 
  startDatum: Date | null = null;
  eindDatum: Date | null = null;
  aantalPlaatsen: number = 0;
  locatie: string = '';

  constructor(private bedrijfService: BedrijfService, private router: Router) {
  }

  ngOnInit() {
    this.fetchBedrijven();
  }
  
  onOptionSelect() {
    console.log('Selected option:', this.selectedOption);
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
  
        if (this.bedrijven.length > 0) {
          this.selectedOption = this.bedrijven[0].id;
          this.onOptionSelect();
        }
      },
      error: (error) => {
        console.error('Error fetching options:', error);
      }
    });
  }

  
  maakParkingcontractAan() {
  
    const parkingContract = {
      id: 0,
      bedrijfId: this.selectedOption,
      aantalPlaatsen: this.aantalPlaatsen,
      startDatum: this.startDatum,
      eindDatum: this.eindDatum,
      aantalBezettePlaatsen: 0,
      status: 1,
      locatie: this.locatie,
    };
  
    console.log('Parking contract:', parkingContract);
    this.bedrijfService.postParkingContract(parkingContract).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/alleparkingcontracten']);
      },
      error: (error) => {
        console.error('Error creating parking contract:', error);
      },
    });
  }
  
}
