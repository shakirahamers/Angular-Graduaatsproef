import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './compontents/header.component';
import { BedanktComponent } from './compontents/bedankt.component';



const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'inputs', component: HeaderComponent },
  { path: 'bedankt', component: BedanktComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
