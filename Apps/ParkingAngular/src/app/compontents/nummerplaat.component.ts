import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-nummerplaat-input',
  template: `
    
      <h3 class="mt-7">{{nummerplaattitle}}</h3>
      <input [(ngModel)]="inputValue"  maxlength="9" (ngModelChange)="onInputChange()" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Uw nummerplaat" >
  `,
  styles: []
})
export class NummerplaatComponent {
@Input() nummerplaattitle: string;

@Output() inputValueChange = new EventEmitter<string>();
  inputValue: string | undefined;

  //emit triggert methode in parent component
  onInputChange() {
    this.inputValueChange.emit(this.inputValue);
  }
  licensePlate = "";
  
  constructor() { 
  this.nummerplaattitle = "";
  }
}
