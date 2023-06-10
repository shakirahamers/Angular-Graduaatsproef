import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './compontents/header.component';
import { InputsComponent } from './compontents/inputs.component';
import { BedanktComponent } from './compontents/bedankt.component';
import { StartComponent } from './compontents/start.component';
import { VertrekComponent } from './compontents/vertrek.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputsComponent,
    BedanktComponent,
    StartComponent,
    VertrekComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
