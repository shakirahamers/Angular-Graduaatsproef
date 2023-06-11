import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-toewijzing',
  template: `
  <app-header [title]="'Bedankt!'" [subtitle]="'U kunt parkeren op plaats'"></app-header>

  <div class="flex flex-col justify-center items-center">
    <h2 class="content-center text-3xl text-white bg-blue-700 font-bold py-2 px-6 rounded-full">{{ randomLetterAndNumber }}</h2>
  <button routerLink="/" class="content-center ml-5 text-blue-700 font-bold py-2 px-4 rounded-full">
          OK
        </button>  
  </div>
  `,
  styles: [],
})
export class ParkingToewijzingComponent {
  
  constructor(private router: Router) {}
  timer = 5000;

  ngOnInit() {
  setTimeout(() => {
    this.router.navigate(['/']);
  }, this.timer);
}

  randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  randomNumber = Math.floor(Math.random() * 10);

  randomLetterAndNumber = this.randomLetter + this.randomNumber;

}

