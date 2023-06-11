import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vertrek',
  template: `
  <div class="mt-64">
  <app-header [title]="'Tot ziens!'" [subtitle]="'Gelieve uw e-mail in te voeren'"></app-header>
    <div class="flex flex-col justify-center items-center h-full">
        <div>
        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-7" placeholder="bv. john.doe@yahoo.be" [(ngModel)]="email" name="email" required>
        </div>
        <button [disabled]="!formValid()" type="submit" [routerLink]="['/bedankt']" queryParamsHandling="merge" [queryParams]="{ subtitle: 'U mag het gebouw verlaten.' }" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Volgende</button>
        <button type="submit" [routerLink]="'/'" class="bg-gray-200 hover:bg-gray-700 text-blue-600 font-bold py-2 px-4 rounded">Terug</button>
      </div>
  `,
  styles: [],
})
export class VertrekComponent {
  email: string = '';
  
  formValid(): boolean {
    return (
      this.email.trim().length > 0
    );
  }
}
