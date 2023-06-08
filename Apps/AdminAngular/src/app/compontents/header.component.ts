import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-header',
  template: `
    <h1 class="text-center content-center mb-11">{{ title }}</h1>
    <app-bedrijfselect></app-bedrijfselect>
  `,
  styles: [],
})
export class HeaderComponent {
  @Input() title: string;

  constructor() {
    this.title = 'Reception Admin';
  }
}

