import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BedanktComponent } from './compontents/bedankt.component';
import { StartComponent } from './compontents/start.component';
import { InputsComponent } from './compontents/inputs.component'; 
import { VertrekComponent } from './compontents/vertrek.component';


const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'inputs', component: InputsComponent },
  { path: 'bedankt', component: BedanktComponent},
  { path: 'vertrek', component: VertrekComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
