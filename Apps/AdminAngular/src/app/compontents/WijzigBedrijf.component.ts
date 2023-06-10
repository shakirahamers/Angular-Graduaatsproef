import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BedrijfService } from '../services/bedrijf.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wijzigbedrijf',
  template: `
    <h1 class="text-center mb-6">Bedrijf wijzigen</h1>
    <div class="flex flex-col justify-center items-center h-full">
    <form [formGroup]="bedrijfForm" (ngSubmit)="updateBedrijf()" class="w-full max-w-md">
      <div>
        <label for="bedrijfsnaam" class="font-semibold mt-5 block mb-2 text-sm text-gray-500">Bedrijfsnaam</label>
        <input type="text" id="bedrijfsnaam" formControlName="naam" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
        <div *ngIf="bedrijfForm.get('naam')?.invalid && (bedrijfForm.get('naam')?.touched || submitted)" class="text-red-500 text-sm mt-1">
            Bedrijfsnaam is verplicht.
          </div>
            <label for="btwnummer" class="block mb-2 text-sm font-semibold text-gray-500">BTW-nummer</label>
            <input type="text" id="btwnummer" formControlName="btwNummer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
            <div *ngIf="bedrijfForm.get('btwNummer')?.invalid && (bedrijfForm.get('btwNummer')?.touched || submitted)" class="text-red-500 text-sm mt-1">
            BTW-nummer is verplicht.
          </div>
          <div *ngIf="btwNummerInvalid" class="text-red-500 text-sm mt-1">
            Ongeldig BTW-nummer.
          </div>
            <label for="adres" class="block mb-2 text-sm font-semibold text-gray-500">Adres</label>
            <input type="text" id="adres" formControlName="adres" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
            <div *ngIf="bedrijfForm?.get('adres')?.invalid && (bedrijfForm?.get('adres')?.touched || submitted)" class="text-red-500 text-sm mt-1">
            Adres is verplicht.
          </div>
            <label for="telnummer" class="block mb-2 text-sm font-semibold text-gray-500">Telefoonnummer</label>
            <input type="int" id="telnummer" formControlName="telefoonNr" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
            <div *ngIf="bedrijfForm?.get('telefoonNr')?.invalid && (bedrijfForm?.get('telefoonNr')?.touched || submitted)" class="text-red-500 text-sm mt-1">
            Telefoonnummer is verplicht.
          </div>
            <label for="email" class="block mb-2 text-sm font-semibold text-gray-500">E-mail</label>
            <input type="text" id="email" formControlName="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
            <div *ngIf="bedrijfForm?.get('email')?.invalid && (bedrijfForm?.get('email')?.touched || submitted)" class="text-red-500 text-sm mt-1">
            E-mailadres is verplicht/ongeldig.
          </div>
          </div>
    </form>
        </div>
        <div class="flex flex-col justify-center items-center h-full">
          <button type="submit" (click)="updateBedrijf()" class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-5">OK</button>
          <button type="submit" (click)="verwijderBedrijf()" class="bg-red-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-2">Verwijder</button>
          <button [routerLink]="'/'" class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Terug</button>

    </div>
  `,
  styles: [],
})
export class WijzigBedrijfComponent implements OnInit {
    selectedOptionData: any;
    bedrijfForm: FormGroup;
    submitted: boolean = false;
    btwNummerInvalid: boolean = false;

  constructor(private route: ActivatedRoute, private bedrijfService: BedrijfService, private router: Router,private http: HttpClient, private formBuilder: FormBuilder) { 
    this.bedrijfForm = this.formBuilder.group({
      naam: ['', Validators.required],
      btwNummer: ['', Validators.required],
      adres: ['', Validators.required],
      telefoonNr: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    const data = this.route.snapshot.queryParams['data'];
    this.selectedOptionData = JSON.parse(data);
    console.log(this.selectedOptionData);
  
    this.bedrijfForm.patchValue({
      naam: this.selectedOptionData.naam,
      btwNummer: this.selectedOptionData.btwNummer,
      adres: this.selectedOptionData.adres,
      telefoonNr: this.selectedOptionData.telefoonNr,
      email: this.selectedOptionData.email
    });
  }
  

  updateBedrijf() {
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
    this.bedrijfService.putBedrijf(this.selectedOptionData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error updating bedrijf:', error);
      }
    });
  }  else {
    this.btwNummerInvalid = true;
    console.error('BTW number is invalid');
  }
},
error: () => {
  console.error('Something went wrong while validating the BTW number');
},
});
}

  verwijderBedrijf() {
    this.bedrijfService.deleteBedrijf(this.selectedOptionData.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error deleting bedrijf:', error);
      }
    });
  }
}  
