import { Injectable, ComponentFactoryResolver, Injector,
         ComponentRef, ApplicationRef, NgZone } from '@angular/core';
import 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';

import { LeafletPopupComponent } from '../pages';
import { TILE_API_BASE_URL, ROUTE_API_BASE_URL } from '../app/config';
import { GeocodingService } from '.';

declare var L: any;

@Injectable()
export class MapService {
  map: any;
  routeControl: any;
  popupsLayer: any;
  markersLayer: any;
  currentZoom: any = 18;
  popupRef: ComponentRef<LeafletPopupComponent>;

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector,
              private appRef: ApplicationRef, private zone: NgZone,
              private geocodingService: GeocodingService) {
  }

  init() {
    if (this.map) {
      return;
    }

    this.map = L.map('map', {
      attributionControl: false
    });

    L.tileLayer(TILE_API_BASE_URL + '/{z}/{x}/{y}.png', {
      attribution: 'Rahpey | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      attributionPrefix: '',
      maxZoom: 18
    }).addTo(this.map);

    this.map.addControl(L.control.attribution({
      position: 'topright',
      prefix: ''
    }));

    this.routeControl = L.Routing.control({
      router: L.Routing.graphHopper('', {
        serviceUrl: ROUTE_API_BASE_URL
        // urlParameters: { algorithm: 'alternative_route', 'ch.disable': true } // activating this need Graphhopper engine come up with `routing.ch.disabling_allowed=true` in it's config.properties file.
      }),
      lineOptions: {
        styles: [{color: 'blue', opacity: 0.8, weight: 2}]
      },
      autoRoute: true,
      show: false,
      // showAlternatives: true,
      routeWhileDragging: true
    }).addTo(this.map);

    this.markersLayer = new L.LayerGroup([]);
    this.popupsLayer = new L.LayerGroup([]);
    this.markersLayer.addTo(this.map);
    this.popupsLayer.addTo(this.map);

    this.map.on({
      contextmenu: (e) => {     // Long press event
        this.zone.run( () => {  // Run it in Angular zone, neccessary to make component creation to work
          this.popupsLayer.clearLayers();
          this.geocodingService.geocodeByLatLng(e.latlng).subscribe(result => {
            this.showDestinationPopup(e.latlng, result[0].formatted_address, false);
          }, error => {
            this.showDestinationPopup(e.latlng, "Unknown", false);
          })
        });
      },
      click: (e) => {
        this.popupsLayer.clearLayers();
      },
      zomeend: (e) => {
        this.currentZoom = e.target._zoom;
      }
    });

  }

  showDestination(item: any) {
    this.showDestinationPopup(item.geometry.location, item.formatted_address, true);
  }

  showDestinationPopup(latLng: any, address: string, centerDestination: boolean) {
    if (centerDestination) {
      this.map.setView([latLng.lat, latLng.lng], this.currentZoom);
    }
    var marker = L.marker(latLng, {icon: this.redIcon});
    this.popupsLayer.addLayer(marker);

    if (this.popupRef) { this.popupRef.destroy(); }
    const compFactory = this.resolver.resolveComponentFactory(LeafletPopupComponent);
    this.popupRef = compFactory.create(this.injector);
    this.popupRef.instance.param = address;
    this.popupRef.instance.onGoButtonClicked.subscribe(x => {
      console.log("goButtonClicked subscribe is working. ", x);
      this.popupsLayer.clearLayers();
      this.map.fitBounds([this.markersLayer.getLayers()[0]._latlng, latLng]);
      this.routeControl.getPlan().spliceWaypoints(0, 2, this.markersLayer.getLayers()[0]._latlng, latLng);
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