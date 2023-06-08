import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BedrijfSelectComponent } from './compontents/parkingin/bedrijfselect.component';
import { ParkingToewijzingComponent } from './compontents/parkingin/parkingtoewijzing.component';
import { ParkingOutInvoerComponent } from './compontents/parkingout/parkingoutinvoer.component';
import { ParkingOutTotziensComponent } from './compontents/parkingout/parkingouttotziens.component';
import { HeaderComponent } from './compontents/header.component';
import { NummerplaatComponent } from './compontents/nummerplaat.component';

@NgModule({
  declarations: [
    AppComponent,
    BedrijfSelectComponent,
    ParkingToewijzingComponent,
    ParkingOutInvoerComponent,
    ParkingOutTotziensComponent,
    HeaderComponent,
    NummerplaatComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
