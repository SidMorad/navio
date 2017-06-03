import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'page-popup',
  template: `
    <ion-grid>
      <ion-row>
        <ion-col col-2>
         <button ion-button small icon-only color="light" outline>
           <ion-icon name="star"></ion-icon>
         </button>
        </ion-col>
        <ion-col col-7>
        </ion-col>
        <ion-col col-3>
          <button ion-button small icon-only color="primary" outline (click)='infoButtonClicked($event)'>
            <ion-icon name="information-circle"></ion-icon>
          </button>
        </ion-col>
      </ion-row>
      <ion-row text-center large>
        <ion-col>{{param}}</ion-col>
      </ion-row>
      <ion-row>
        <ion-col col-6>
          <button ion-button full color="light" disabled>Send</button>
        </ion-col>
        <ion-col col-6>
          <button ion-button full color="primary" (click)='goButtonClicked($event)'
                  icon-right>GO
            <ion-icon name="arrow-dropright"></ion-icon>
          </button>
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})
export class LeafletPopupComponent {
  param: any;
  counter: number = 0;

  onGoButtonClicked = new EventEmitter();
  goButtonClicked() {
    this.onGoButtonClicked.emit(++this.counter);
  }

  onInfoButtonClicked = new EventEmitter();
  infoButtonClicked() {
    this.onInfoButtonClicked.emit();
  }

}