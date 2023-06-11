import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-start',
  template: `
  <div class="mt-64">
    <h4>Welkom!</h4>
  <h3>Gelieve uw keuze te selecteren</h3>
    <div class="flex flex-col justify-center items-center h-full">
      <button [routerLink]="'/inputs'" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-10">Aankomst</button>
      <button [routerLink]="'/vertrek'" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-2">Vertrek</button>
    </div>
    </div>
  `,
  styles: [],
})
export class StartComponent {  
}
