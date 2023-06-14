import { Component } from '@angular/core';

@Component({
  selector: 'app-inputs',
  template: `
    <div class="mt-24">
      <app-header [subtitle]="'Gelieve uw gegevens in te vullen'"></app-header>
      <div class="flex flex-col justify-center items-center h-full">
        <div>
          <label for="voornaam" class="font-semibold mt-5 block mb-2 text-blue-600">Voornaam</label>
          <input type="text" id="voornaam" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-5"
            placeholder="bv. John" required [(ngModel)]="voornaam" name="voornaam">

          <label for="achternaam" class="block mb-2 font-semibold text-blue-600">Achternaam</label>
          <input type="text" id="achternaam" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-5"
            placeholder="bv. Doe" required [(ngModel)]="achternaam" name="achternaam">

          <label for="email" class="block mb-2 font-semibold text-blue-600">Email</label>
          <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-5"
            placeholder="bv. john.doe@yahoo.be" required [(ngModel)]="email" name="email">

          <div>
            <label for="bedrijf" class="block mb-2 font-semibold text-blue-600">Bedrijf</label>
            <select [(ngModel)]="bedrijf" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-5"
              required name="bedrijf">
              <option value="" disabled selected class="text-gray-400">Kies een bedrijf</option>
              <option *ngFor="let bedrijf of bedrijven" [value]="bedrijf">{{ bedrijf }}</option>
            </select>

            <label *ngIf="bedrijf" for="werknemer" class="block mb-2 font-semibold text-blue-600">Werknemer</label>
            <input *ngIf="bedrijf" type="text" id="werknemer" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-5"
              required [(ngModel)]="werknemer" name="werknemer">
          </div>
        </div>
        <div class="flex flex-col justify-center items-center h-full">
          <button type="submit" [routerLink]="'/bedankt'" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
            [disabled]="!formValid()">Volgende</button>
          <button type="submit" [routerLink]="'/'" class="bg-gray-200 hover:bg-gray-700 text-blue-600 font-bold py-2 px-4 rounded">Terug</button>
        </div>
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

  voornaam: string = '';
  achternaam: string = '';
  email: string = '';
  bedrijf: string = '';
  werknemer: string = '';

  formValid(): boolean {
    return (
      this.voornaam.trim().length > 0 &&
      this.achternaam.trim().length > 0 &&
      this.email.trim().length > 0 &&
      this.bedrijf.trim().length > 0 &&
      (this.werknemer.trim().length > 0)
    );
  }
}
