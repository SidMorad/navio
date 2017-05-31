import { Injectable, ComponentFactoryResolver, Injector,
         ComponentRef, ApplicationRef, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
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
  currentZoom: number;
  popupRef: ComponentRef<LeafletPopupComponent>;

  public static readonly LAST_ZOOM_LEVEL_KEY: string = "lastZoomLevel";

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector,
              private appRef: ApplicationRef, private zone: NgZone,
              private geocodingService: GeocodingService, private storage: Storage) {
    storage.get(MapService.LAST_ZOOM_LEVEL_KEY).then((val) => {
      if (val && Number(val) !== NaN) {
        this.currentZoom = val;
      } else {
        this.currentZoom = 18;
      }
    });
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
        serviceUrl: ROUTE_API_BASE_URL,
        urlParameters: {
          // algorithm: 'alternative_route',
          'ch.disable': true,
          block_area: '35.71346,51.38765,35.66032,51.44612'
         }
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
          this.showDestinationByLatLng(e.latlng);
        });
      },
      click: (e) => {
        this.popupsLayer.clearLayers();
      },
      zoomend: (e) => {
        this.currentZoom = e.target._zoom;
        this.storage.set(MapService.LAST_ZOOM_LEVEL_KEY, e.target._zoom);
      }
    });

    L.polygon([
      [35.71452, 51.38897],
      [35.72118, 51.40765],
      [35.72404, 51.41006],
      [35.72465, 51.43761],
      [35.72407, 51.44107],
      [35.71779, 51.43946],
      [35.71731, 51.44085],
      [35.70698, 51.43485],
      [35.70710, 51.44101],
      [35.69958, 51.43884],
      [35.70202, 51.44871],
      [35.66032, 51.44612], // طیب
      [35.65649, 51.40909], // شوش
      [35.65846, 51.39509], // انتهای کارگر جنوبی
      [35.71346, 51.38765], // ابتدای کارگر جنوبی
    ]).addTo(this.map);
  }

  showDestination(item: any) {
    this.showDestinationPopup(item.geometry.location, item.formatted_address, true);
  }

  showDestinationByLatLng(latlng: any) {
    this.popupsLayer.clearLayers();
    this.geocodingService.geocodeByLatLng(latlng).subscribe(result => {
      this.showDestinationPopup(latlng, result[0].formatted_address + " " + latlng.lat + " " + latlng.lng, false);
    }, error => {
      this.showDestinationPopup(latlng, "Unknown", false);
    })
  }

  showDestinationPopup(latLng: any, address: string, centerDestination: boolean) {
    if (centerDestination) {
      this.map.setView([latLng.lat, latLng.lng], this.currentZoom);
    }
    var marker = L.marker(latLng, {icon: this.redIcon, draggable: true});
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

    var popup = marker.bindPopup(this.popupRef.location.nativeElement, {closeButton: false, maxWidth: 400, minWidth: 200});

    var firstTime = true;
    popup.on({
      popupopen: (e) => {
        if(!firstTime) {
          this.showDestinationByLatLng(e.target._latlng);
        }
        firstTime = false;
      }
    });

    popup.openPopup();
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