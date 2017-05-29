import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-leaflet-popup-element',
  template: `
    <div ion-alert>
      {{ param }}<br /><hr/>
      <div class="alert-button-group">
        <button ion-button color="light" disabled>Send</button>
        <button ion-button color="primary" (click)='goButtonClicked($event)'
                icon-right>GO
          <ion-icon name="arrow-dropright"></ion-icon>
        </button>
      </div>
    </div>
  `
})
export class LeafletPopupComponent {
  param: any;
  counter: number = 0;

  onGoButtonClicked = new EventEmitter();
  goButtonClicked() {
    console.log("Go button clicked!");
    this.onGoButtonClicked.emit(++this.counter);
  }

}