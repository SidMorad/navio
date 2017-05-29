import { Injectable, ComponentFactoryResolver, Injector,
         ComponentRef, ApplicationRef } from '@angular/core';

import { LeafletPopupComponent } from '../pages';

@Injectable()
export class MapService {
  map: any;
  routeControl: any;
  popupsLayer: any;
  markersLayer: any;
  currentZoom: any;
  popupRef: ComponentRef<LeafletPopupComponent>;

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector,
              private appRef: ApplicationRef) {
    this.currentZoom = 18;
  }

  showDestination(item: any) {
    this.map.setView([item.geometry.location.lat, item.geometry.location.lng], this.currentZoom);
    var marker = L.marker(item.geometry.location, {icon: this.redIcon});
    this.popupsLayer.addLayer(marker);

    if (this.popupRef) { this.popupRef.destroy(); }
    const compFactory = this.resolver.resolveComponentFactory(LeafletPopupComponent);
    this.popupRef = compFactory.create(this.injector);
    this.popupRef.instance.param = item.formatted_address;
    this.popupRef.instance.onGoButtonClicked.subscribe(x => {
      console.log("goButtonClicked subscribe is working. ", x);
      this.popupsLayer.clearLayers();
      this.routeControl.getPlan().spliceWaypoints(0, 2, this.markersLayer.getLayers()[0]._latlng, item.geometry.location);
    });

    this.appRef.attachView(this.popupRef.hostView);
    this.popupRef.onDestroy(() => {
      this.appRef.detachView(this.popupRef.hostView);
    });

    marker.bindPopup(this.popupRef.location.nativeElement, {closeButton: false, maxWidth: 400, minWidth: 200}).openPopup();
  }


  redIcon = new L.Icon({
    iconUrl: 'assets/img/marker-icon-2x-red.png',
    shadowUrl: 'assets/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

}