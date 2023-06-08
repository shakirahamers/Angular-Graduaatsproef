import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './compontents/header.component';
import { NieuwParkeerContractComponent } from './compontents/NieuwParkeerContract.component';
import { NieuwBedrijfComponent } from './compontents/NieuwBedrijf.component';
import { WijzigBedrijfComponent } from './compontents/WijzigBedrijf.component';
import { AlleBezoekersComponent } from './compontents/AlleBezoekers.component';
import { ParkingContractenComponent } from './compontents/ParkeerContracten.component';


const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'inputs', component: HeaderComponent },
  { path: 'nieuwparkeercontract', component: NieuwParkeerContractComponent },
  { path: 'nieuwbedrijf', component: NieuwBedrijfComponent },
  { path: 'wijzigbedrijf', component: WijzigBedrijfComponent },
  { path: 'allebezoekers', component: AlleBezoekersComponent },
  { path: 'alleparkingcontracten', component: ParkingContractenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
