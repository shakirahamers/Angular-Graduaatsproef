import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './compontents/header.component';
import { BedrijfSelectComponent } from './compontents/BedrijfSelect.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatagridComponent } from './compontents/BezoekerDataGrid.component';
import { ParkingContractComponent } from './compontents/ParkingContract.component';
import { NieuwParkeerContractComponent } from './compontents/NieuwParkeerContract.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NieuwBedrijfComponent } from './compontents/NieuwBedrijf.component';
import { WijzigBedrijfComponent } from './compontents/WijzigBedrijf.component';
import { AlleBezoekersComponent } from './compontents/AlleBezoekers.component';
import { ParkingContractenComponent } from './compontents/ParkeerContracten.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BedrijfSelectComponent,
    DatagridComponent,
    ParkingContractComponent,
    NieuwParkeerContractComponent,
    NieuwBedrijfComponent,
    WijzigBedrijfComponent,
    AlleBezoekersComponent,
    ParkingContractenComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
