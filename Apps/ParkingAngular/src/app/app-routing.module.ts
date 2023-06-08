import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BedrijfSelectComponent } from './compontents/parkingin/bedrijfselect.component';
import { ParkingToewijzingComponent } from './compontents/parkingin/parkingtoewijzing.component';
import { HeaderComponent } from './compontents/header.component';
import { NummerplaatComponent } from './compontents/nummerplaat.component';
import { ParkingOutInvoerComponent } from './compontents/parkingout/parkingoutinvoer.component';
import { ParkingOutTotziensComponent } from './compontents/parkingout/parkingouttotziens.component';

const routes: Routes = [
  { path: '', component: BedrijfSelectComponent },
  { path: 'parkingtoewijzing', component: ParkingToewijzingComponent },
  { path: 'parkingoutinvoer', component: ParkingOutInvoerComponent },
  { path: 'parkingouttotziens', component: ParkingOutTotziensComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'nummerplaat', component: NummerplaatComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
