import { Component, Input, NgModule } from '@angular/core';
import { BedrijfService } from '../services/bedrijf.service';
import { id } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-alleparkingcontracten',
  template: `
    <h1 class="text-center mb-6">Alle parkingcontracten</h1>
    <div class="container mx-auto w-2/3 border-solid bg-gray-200 rounded-lg border-2 m-3 p-5" style="height: 420px;">
      <ngx-datatable
        class="min-w-full divide-y divide-gray-200 bg-gray-300 overflow-hidden shadow-md sm:rounded-lg content-center px-4"
        [rows]="parkingcontracten" [columns]="columns"
        [columnMode]="'force'">
      </ngx-datatable>
    </div>
    <div class="flex justify-center">
    <button [routerLink]="'/'" class="text-center mr-5 bedrijf-select ml-2 content-center bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block p-2.5 dark:bg-gray-400 hover:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-gray-500">
    Terug
    </button>
    </div>


  `,

  styles: [],
})
export class ParkingContractenComponent {  
  @Input()
  parkingcontracten: any[] = [];

  constructor(private bedrijfService: BedrijfService) {
  }

  columns = [
    { prop: 'bedrijf', name: 'Bedrijf' },
    { prop: 'startDatum', name: 'Startdatum' },
    { prop: 'eindDatum', name: 'Einddatum' },
    { prop: 'aantalPlaatsen', name: 'Aantal plaatsen' },
    { prop: 'locatie', name: 'Locatie'}
  ];

  ngOnInit() {
    this.fetchParkingContracten();
  }

  fetchParkingContracten() {
    this.bedrijfService.getParkingcontracten().subscribe({
      next: (response) => {
        this.parkingcontracten = response;

        // Fetch bedrijf name for each parkingcontract
        for (const contract of this.parkingcontracten) {
          this.fetchBedrijfName(contract.bedrijfId);
        }
      },
      error: (error) => {
        console.error('Error fetching parkingcontracten:', error);
      },
    });
  }

  fetchBedrijfName(bedrijfId: number) {
    this.bedrijfService.getBedrijfById(bedrijfId).subscribe({
      next: (response) => {
        const bedrijf = response;
        const parkingcontract = this.parkingcontracten.find(
          (contract) => contract.bedrijfId === bedrijfId
        );
        if (parkingcontract) {
          parkingcontract.bedrijf = bedrijf.naam;
        }
      },
      error: (error) => {
        console.error('Error fetching bedrijf:', error);
      },
    });
  }
}