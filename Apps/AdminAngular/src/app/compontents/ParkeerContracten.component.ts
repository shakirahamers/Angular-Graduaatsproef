import { Component, Input } from '@angular/core';
import { BedrijfService } from '../services/bedrijf.service';

@Component({
  selector: 'app-alleparkingcontracten',
  template: `
    <h1 class="text-center mb-6">Alle parkingcontracten</h1>
    <div class="container mx-auto w-2/3 border-solid bg-gray-200 rounded-lg border-2 m-3 p-5" style="height: 420px;">
      <ngx-datatable
        class="min-w-full divide-y divide-gray-200 bg-gray-300 overflow-hidden shadow-md sm:rounded-lg content-center px-4"
        [rows]="parkingcontracten" [columns]="columns" [columnMode]="'force'">
        <ngx-datatable-column name="Bedrijf" prop="bedrijf"></ngx-datatable-column>
        <ngx-datatable-column name="Startdatum" prop="startDatum"></ngx-datatable-column>
        <ngx-datatable-column name="Einddatum" prop="eindDatum"></ngx-datatable-column>
        <ngx-datatable-column name="Aantal plaatsen" prop="aantalPlaatsen"></ngx-datatable-column>
        <ngx-datatable-column name="Locatie" prop="locatie"></ngx-datatable-column>
        <ngx-datatable-column name="Actions" prop="actions">
          <ng-template let-row="row" ngx-datatable-cell-template>
            <button class="delete-button -mt-4 bg-transparent text-red-800 font-extrabold" (click)="verwijderParkingContract(row)">X</button>
          </ng-template>
        </ngx-datatable-column>
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

  constructor(private bedrijfService: BedrijfService) {}

  columns = [
    { prop: 'bedrijf', name: 'Bedrijf' },
    { prop: 'startDatum', name: 'Startdatum' },
    { prop: 'eindDatum', name: 'Einddatum' },
    { prop: 'aantalPlaatsen', name: 'Aantal plaatsen' },
    { prop: 'locatie', name: 'Locatie' },
    { prop: 'actions', name: 'Verwijder', width: 100 },
  ];

  ngOnInit() {
    this.fetchParkingContracten();
  }

  fetchParkingContracten() {
    this.bedrijfService.getParkingcontracten().subscribe({
      next: (response) => {
        this.parkingcontracten = response;
        this.fetchBedrijfNames(); // Fetch bedrijf names for each parkingcontract
      },
      error: (error) => {
        console.error('Error fetching parkingcontracten:', error);
      },
    });
  }

  fetchBedrijfNames() {
    for (const contract of this.parkingcontracten) {
      this.bedrijfService.getBedrijfById(contract.bedrijfId).subscribe({
        next: (response) => {
          const bedrijf = response;
          contract.bedrijf = bedrijf.naam;
        },
        error: (error) => {
          console.error('Error fetching bedrijf:', error);
        },
      });
    }
  }

  verwijderParkingContract(contract: any) {
    this.bedrijfService.deleteParkingContract(contract.id).subscribe({
      next: () => {
        this.fetchParkingContracten();
      },
      error: (error) => {
        console.error('Error deleting parkingcontract:', error);
      },
    });
  }
}
