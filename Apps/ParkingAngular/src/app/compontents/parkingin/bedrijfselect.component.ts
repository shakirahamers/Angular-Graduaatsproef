import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bedrijf-select',
  template: `
  <div class="flex flex-col justify-center items-center -mt-10">
  <p class="text-center text-gray-400 bg-transparent" routerLink="/parkingoutinvoer"class="btn">Parking Out</p>
  </div>
  <app-header [title]="'Welkom!'" [subtitle]="'Voor welk bedrijf komt u?'"></app-header>

  <div class="flex flex-col justify-center items-center -mt-4">
      <select [(ngModel)]="selectedOption" (change)="onOptionSelect()" class="center ml-20 ms-20 w-96 content-center bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 block p-2.5 dark:bg-blue-700 hover:bg-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-blue-500">
        <option [style.background-color]="'gray'" [disabled]="selectedOption === defaultOption" value="{{ defaultOption }}">{{ defaultOption }}</option>
        <option *ngFor="let option of options" [value]="option.name">{{ option.name }}</option>
      </select>

      <div *ngIf="selectedOptionCapacity" [style.background-color]="getCapacityPercentage() < 60 ? 'green' : getCapacityPercentage() < 100 ? 'orange' : 'darkred'" class="w-80 h-10 mt-5 rounded-lg text-center">
      <h2 class="text-white">Beschikbare plaatsen: {{ (selectedOptionMax ?? 0) - (selectedOptionCapacity) }} / {{ selectedOptionMax ?? 0 }}</h2>
  <app-nummerplaat-input (inputValueChange)="onInputValueChange($event)" [nummerplaattitle]="'Gelieve uw nummerplaat in te voeren'" *ngIf="getCapacityPercentage() < 100"></app-nummerplaat-input>
  <button [disabled]="!trimmedInputValue" routerLink="/parkingtoewijzing" *ngIf="getCapacityPercentage() < 100" class="content-center bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2 ok-button">
    OK
  </button>
</div>

        <div *ngIf="getCapacityPercentage() === 100">
          <p class="text-red-800 font-medium mt-6 text-lg">Sorry, dit bedrijf heeft geen parkeerplaatsen meer. Gelieve een ander bedrijf te kiezen.</p>
        </div>
  </div>

  `,
  styles: [],
})
export class BedrijfSelectComponent implements OnInit {
    options: { name: string, capacity: number, max: number }[] = [
      { name: 'AllPhi 1', capacity: 10, max: 50 },
      { name: 'AllPhi 2', capacity: 20, max: 25 },
      { name: 'AllPhi 3', capacity: 30, max: 30 },
    ];
  
    defaultOption = "Selecteer een bedrijf...";
    selectedOption: string = "";
    selectedOptionCapacity: number | undefined;
    selectedOptionMax: number | undefined;
  
    ngOnInit() {
      this.selectedOption = this.defaultOption;
    }

  onOptionSelect() {
    console.log('Geselecteerde optie:', this.selectedOption);

    const option = this.options.find(opt => opt.name === this.selectedOption);
    if (option) {
      this.selectedOptionCapacity = option.capacity;
      this.selectedOptionMax = option.max;
    } else {
      this.selectedOptionCapacity = undefined;
      this.selectedOptionMax = undefined;
    }
  }

  getCapacityPercentage(): number {
    return this.selectedOptionCapacity && this.selectedOptionMax
      ? this.selectedOptionCapacity / this.selectedOptionMax * 100
      : 0;
  }

  inputValue: string | undefined;
  trimmedInputValue: string | undefined;

  onInputValueChange(value: string) {
    this.inputValue = value;
    this.trimmedInputValue = this.inputValue.trim();
  }

}


