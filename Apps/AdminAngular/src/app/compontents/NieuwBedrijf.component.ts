import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BedrijfService } from '../services/bedrijf.service';

@Component({
  selector: 'app-nieuwbedrijf',
  template: `
  <h1 class="text-center mb-6">Bedrijf aanmaken</h1>
    <div class="flex flex-col justify-center items-center h-full">
    <form [formGroup]="bedrijfForm" (ngSubmit)="createBedrijf()" class="w-full max-w-md">
        <div>
          <label for="bedrijfsnaam" class="font-semibold mt-5 block mb-2 text-sm text-gray-500">Bedrijfsnaam</label>
          <input type="text" id="bedrijfsnaam" formControlName="naam" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <div *ngIf="bedrijfForm.get('naam')?.invalid && (bedrijfForm.get('naam')?.touched || submitted)" class="text-red-500 text-sm mt-1">
            Bedrijfsnaam is verplicht.
          </div>
          <label for="btwnummer" class="block mb-2 text-sm font-semibold text-gray-500">BTW-nummer</label>
          <input type="text" id="btwnummer" formControlName="btwNummer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <div *ngIf="bedrijfForm.get('btwNummer')?.invalid && (bedrijfForm.get('btwNummer')?.touched || submitted)" class="text-red-500 text-sm mt-1">
            BTW-nummer is verplicht.
          </div>
          <div *ngIf="btwNummerInvalid" class="text-red-500 text-sm mt-1">
            Ongeldig BTW-nummer.
          </div>
          <label for="adres" class="block mb-2 text-sm font-semibold text-gray-500">Adres</label>
          <input type="text" id="adres" formControlName="adres" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <div *ngIf="bedrijfForm?.get('adres')?.invalid && (bedrijfForm?.get('adres')?.touched || submitted)" class="text-red-500 text-sm mt-1">
            Adres is verplicht.
          </div>

          <label for="telnummer" class="block mb-2 text-sm font-semibold text-gray-500">Telefoonnummer</label>
          <input type="tel" id="telnummer" formControlName="telefoonNr" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <div *ngIf="bedrijfForm?.get('telefoonNr')?.invalid && (bedrijfForm?.get('telefoonNr')?.touched || submitted)" class="text-red-500 text-sm mt-1">
            Telefoonnummer is verplicht.
          </div>

          <label for="email" class="block mb-2 text-sm font-semibold text-gray-500">E-mail</label>
          <input type="email" id="email" formControlName="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <div *ngIf="bedrijfForm?.get('email')?.invalid && (bedrijfForm?.get('email')?.touched || submitted)" class="text-red-500 text-sm mt-1">
            E-mailadres is verplicht/ongeldig.
          </div>
          </div>
    </form>
        </div>
        <div class="flex flex-col justify-center items-center h-full">
          <button type="submit" (click)="createBedrijf()" class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-5">OK</button>
          <button [routerLink]="'/'" class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Terug</button> 
    </div>
  `,
  styles: [],
})
export class NieuwBedrijfComponent {  
  bedrijfForm: FormGroup;
  btwNummerInvalid: boolean = false;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private bedrijfService: BedrijfService, private router: Router, private http: HttpClient) {
    this.bedrijfForm = this.formBuilder.group({
      naam: ['', Validators.required],
      btwNummer: ['', Validators.required],
      adres: ['', Validators.required],
      telefoonNr: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  createBedrijf() {
    this.submitted = true;
    if (this.bedrijfForm.invalid) {
      console.error('Form invalid');
      return;
    }

    const btwNummer = this.bedrijfForm.value.btwNummer;

    //API om BTW nummer te valideren
    this.http.get(`https://controleerbtwnummer.eu/api/validate/${btwNummer}.json`).subscribe({
      next: (response: any) => {
        if (response.valid) {
          //als het BTW nummer geldig is, wordt het bedrijf aangemaakt
          const bedrijf = this.bedrijfForm.value;
          bedrijf.status = 1;

          this.bedrijfService.postBedrijf(bedrijf).subscribe({
            next: () => {
              this.router.navigate(['/']);
            },
          });
        } else {
          this.btwNummerInvalid = true;
          console.error('BTW number is invalid');
        }
      },
      error: () => {
        console.error('Something went wrong while validating the BTW number');
      },
    });
  }
}
