import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inputs',
  template: `
      <app-header [subtitle]="'Gelieve uw gegevens in te vullen'"></app-header>
    <div class="flex flex-col justify-center items-center h-full">
      <div>
        <label for="voornaam" class="font-semibold mt-5 block mb-2 text-blue-600">Voornaam</label>
        <input type="text" id="voornaam" class=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-5" placeholder="bv. John" required>

        <label for="achternaam" class="block mb-2 font-semibold text-blue-600">Achternaam</label>
        <input type="text" id="achternaam" class="t bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-5" placeholder="bv. Doe" required>

        <label for="email" class="block mb-2 font-semibold text-blue-600">Email</label>
        <input type="email" id="email" class=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-5" placeholder="bv. john.doe@yahoo.be" required>

        <div>
          <label for="bedrijf" class="block mb-2 font-semibold text-blue-600">Bedrijf</label>
          <select [(ngModel)]="bedrijf" class=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-5">
            <option value="" disabled selected class="text-gray-400">Kies een bedrijf</option>
            <option *ngFor="let bedrijf of bedrijven" [value]="bedrijf">{{ bedrijf }}</option>
          </select>

          <label *ngIf="bedrijf" for="werknemer" class="block mb-2font-semibold text-blue-600">Werknemer</label>
          <select *ngIf="bedrijf" [(ngModel)]="werknemer" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-5">
            <option value="" disabled selected class="text-gray-400">Kies een werknemer</option>
            <option *ngFor="let werknemer of werknemers" [value]="werknemer">{{ werknemer }}</option>
          </select>

          <label for="nummerplaat" class="block mb-2 font-semibold text-blue-600">Nummerplaat</label>
          <input type="nummerplaat" id="nummerplaat" class=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-5" placeholder="bv. 1-ABC-123" required>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center h-full">
        <button type="submit" [routerLink]= "'/bedankt'"class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Volgende</button>
        <button type="submit" [routerLink]= "'/'"class="bg-gray-200 hover:bg-gray-700 text-blue-600 font-bold py-2 px-4 rounded">Terug</button>
      </div>
    </div>
  `,
  styles: [],
})
export class InputsComponent {  

  private map = new Map<string, { werknemers: string[] }>([
    ['AllPhi 1', { werknemers: ['Jos'] }],
    ['AllPhi 2', { werknemers: ['Marie', 'Peter'] }],
    ['AllPhi 3', { werknemers: ['Luc', 'Liesbeth', 'Erik'] }],
  ]);

  get bedrijven(): string[] {
    return Array.from(this.map.keys());
  }

  get werknemers(): string[] | undefined {
    const bedrijfObject = this.map.get(this.bedrijf);
    return bedrijfObject ? bedrijfObject.werknemers : undefined;
  }

  bedrijf: string = '';
  werknemer: string = '';
  
}
