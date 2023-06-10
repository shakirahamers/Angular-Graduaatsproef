import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bedankt',
  template: `
    <div class="flex flex-col justify-center items-center h-screen ">
      <h1 class="text-4xl font-bold">{{ title }}</h1>
      <h3 class="text-2xl">{{ subtitle }}</h3>
      <button type="submit" [routerLink]="'/'" class="text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-56">OK</button>
    </div>
  `,
  styles: [`
    .h-screen {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
})
export class BedanktComponent implements OnInit {
  title: string;
  subtitle: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.title = 'Bedankt!';
    this.subtitle = 'U kunt uw bezoek verderzetten.';
  }

  timer = 5000;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.subtitle = params['subtitle'] || this.subtitle;
    });

    setTimeout(() => {
      this.router.navigate(['/']);
    }, this.timer);
  }
}
