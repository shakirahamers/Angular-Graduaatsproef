import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <h1>{{ title }}</h1>
    <h3>{{ subtitle }}</h3>
  `,
  styles: [],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;

  constructor() {
    this.title = '';
    this.subtitle = '';
  }
}

