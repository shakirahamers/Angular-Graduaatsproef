import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BedrijfService } from '../services/bedrijf.service';

@Component({
  selector: 'app-nieuwbedrijf',
  template: `
  <h1 class="text-center mb-6">Bedrijf aanmaken</h1>
    <div class="flex flex-col justify-center items-center h-full">
        <div>
            <label for="bedrijfsnaam" class="font-semibold mt-5 block mb-2 text-sm text-gray-500">Bedrijfsnaam</label>
            <input type="text" id="bedrijfsnaam" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" [(ngModel)]="bedrijf.naam" required>

            <label for="btwnummer" class="block mb-2 text-sm font-semibold text-gray-500">BTW-nummer</label>
            <input type="text" id="btwnummer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" [(ngModel)]="bedrijf.btwNummer" required>

            <label for="adres" class="block mb-2 text-sm font-semibold text-gray-500">Adres</label>
            <input type="text" id="adres" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" [(ngModel)]="bedrijf.adres"  required>

            <label for="telnummer" class="block mb-2 text-sm font-semibold text-gray-500">Telefoonnummer</label>
            <input type="int" id="telnummer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" [(ngModel)]="bedrijf.telefoonNr" required>

            <label for="email" class="block mb-2 text-sm font-semibold text-gray-500">E-mail</label>
            <input type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" [(ngModel)]="bedrijf.email" required>

          </div>
        </div>
        <div class="flex flex-col justify-center items-center h-full">
          <button type="submit" (click)="createBedrijf()" class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-5">OK</button>

    </div>
  `,
  styles: [],
})
export class NieuwBedrijfComponent {  
  bedrijf: any = {};

  constructor(private bedrijfService: BedrijfService, private router: Router) { }

  createBedrijf() {
    console.log(this.bedrijf);
    this.bedrijf.status = 1;
    this.bedrijfService.postBedrijf(this.bedrijf).subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }
}
