import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-datagrid',
  template: `
    <div class="container mx-auto w-2/3 border-solid bg-gray-200 rounded-lg border-2 m-3 p-5" style="height: 420px;">
      <ngx-datatable
        class="min-w-full divide-y divide-gray-200 bg-gray-300 overflow-hidden shadow-md sm:rounded-lg content-center px-4"
        [rows]="bezoekers" [columns]="columns"
        [columnMode]="'force'">
      </ngx-datatable>
    </div>
  `,
})
export class DatagridComponent {
  @Input()
  bezoekers: any[] = [];

  columns = [
    { prop: 'voornaam', name: 'Voornaam' },
    { prop: 'achternaam', name: 'Achternaam' },
    { prop: 'email', name: 'Email' },
  ];
}

