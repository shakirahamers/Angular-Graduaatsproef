import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-outtotziens',
  template: `
    <app-header [title]="'Tot ziens!'" [subtitle]="'U mag de parking verlaten'"></app-header>
  <div class="flex flex-col justify-center items-center">
  <button routerLink="/parkingoutinvoer" class="content-center ml-5 text-white bg-blue-700 font-bold py-2 px-4 rounded-full">
          OK
        </button>  
  </div>
  `,
  styles: [],
})
export class ParkingOutTotziensComponent {

}