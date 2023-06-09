import { NumberFormatStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BedrijfSelectComponent } from './BedrijfSelect.component';

@Component({
  selector: 'app-parkingcontract',
  template: `
<div class="container flex mx-auto">
  <div class="flex items-center mb-6">
    <h3>Gereserveerde parkeerplaatsen:</h3>
    <h3 class="text-center mx-auto ml-3 h-10 w-35 bg-gray-400 text-white border-gray-300 rounded-lg border">&nbsp; {{parkingcontract.aantalBezettePlaatsen}} / {{parkingcontract.aantalPlaatsen}} &nbsp;</h3>
  </div>
  <div class="flex items-center mb-6 mt-5">
    <button routerLink="/nieuwparkeercontract" class="text-center mb-6 bedrijf-select ml-2 content-center bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block p-2.5 dark:bg-gray-400 hover:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-gray-500">Nieuw parkeercontract</button>
  </div>
  <div class="flex items-center mb-6 mt-5">
    <button routerLink="/alleparkingcontracten" class="text-center mb-6 bedrijf-select ml-2 content-center bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 block p-2.5 dark:bg-gray-400 hover:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-gray-500">Parkeercontracten</button>
  </div>
</div>
  `,
  styles: [],
})
export class ParkingContractComponent {  
  @Input() parkingcontract: any = {};
}
