import { Component } from '@angular/core';

@Component({
  selector: 'loading-spinner-app',
  template:
    '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent {}
