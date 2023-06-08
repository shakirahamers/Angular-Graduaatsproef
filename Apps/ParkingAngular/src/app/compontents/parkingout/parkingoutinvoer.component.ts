import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-outinvoer',
  template: `
  <app-header [title]="'Bedankt voor uw bezoek!'" [subtitle]="'Gelieve uw nummerplaat in te voeren voor u de parking verlaat'"></app-header>

  <div class="flex flex-col justify-center items-center">
    <app-nummerplaat-input (inputValueChange)="onInputValueChange($event)"></app-nummerplaat-input>
  <button [disabled]="!trimmedInputValue" routerLink="/parkingouttotziens" class="content-center ml-5 text-white bg-blue-700 font-bold py-2 px-4 rounded-full">
          OK
        </button>  
        <p class="text-center bg-transparent" routerLink="/"class="btn">Parking In</p>
  </div>
  `,
  styles: [],
})
export class ParkingOutInvoerComponent {
  inputValue: string | undefined;
  trimmedInputValue: string | undefined;

  onInputValueChange(value: string) {
    this.inputValue = value;
    this.trimmedInputValue = this.inputValue.trim();
  }
}