import { Injectable, ComponentFactoryResolver, Injector,
         ComponentRef, ApplicationRef, NgZone } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';

import { LeafletPopupComponent } from '../pages';
import { TILE_API_BASE_URL, ROUTE_API_BASE_URL } from '../app/config';
import { GeocodingService } from '.';
import { Settings } from '../providers';

declare var L: any;

@Injectable()
export class MapService {
  map: any;
  routeControl: any;
  currentLocationLayer: any;
  startLocationLayer: any;
  highlightLayer: any;
  popupsLayer: any;
  currentZoom: number;
  popupRef: ComponentRef<LeafletPopupComponent>;

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector,
              private appRef: ApplicationRef, private zone: NgZone,
              private geocodingService: GeocodingService, private settings: Settings,
              private actionSheetCtrl: ActionSheetController) {
  }

  init() {
    if (this.map) {
      return;
    }

    this.settings.getValue(Settings.LAST_ZOOM_LEVEL_KEY).then(val => {
      this.currentZoom = val;
    });

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
      createMarker: function(i: number, waypoint: any, total: number) {
        if (i === 0) {
          return false;
        }
        return L.marker(waypoint.latLng, { draggable: true });
      },
      autoRoute: true,
      show: false,
      // showAlternatives: true,
      routeWhileDragging: true
    }).addTo(this.map);

    this.currentLocationLayer = new L.LayerGroup([]);
    this.startLocationLayer = new L.LayerGroup([]);
    this.popupsLayer = new L.LayerGroup([]);
    this.highlightLayer = new L.LayerGroup([]);
    this.currentLocationLayer.setZIndex(-1);
    this.startLocationLayer.setZIndex(-1);
    this.popupsLayer.setZIndex(-1);
    this.highlightLayer.setZIndex(-1);
    this.currentLocationLayer.addTo(this.map);
    this.startLocationLayer.addTo(this.map);
    this.popupsLayer.addTo(this.map);
    this.highlightLayer.addTo(this.map);

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
        this.settings.setValue(Settings.LAST_ZOOM_LEVEL_KEY, this.currentZoom);
      }
    });

    this.addHighlightLayers();
    this.settings.onSettingsChangeEvent.subscribe(() => {
      this.highlightLayer.clearLayers();
      this.addHighlightLayers();
    });

  }

  addHighlightLayers() {
    this.settings.getValue(Settings.HIGHLIGHT_TEHRAN_MAIN_TRAFFIC_ZONE).then(val => {
      console.log("highlightTehranMainTrafficZone", val);
      if (val === true) {
        this.highlightLayer.addLayer(this.tehranMainTrafficZonePolygon);
      }
    });
  }

  showDestination(item: any) {
    this.showDestinationPopup(item.geometry.location, item.formatted_address, true);
  }

  showDestinationByLatLng(latlng: any) {
    this.popupsLayer.clearLayers();
    this.geocodingService.geocodeByLatLng(latlng).subscribe(result => {
      this.showDestinationPopup(latlng, result[0].formatted_address, false);
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
      this.popupsLayer.clearLayers();
      this.map.fitBounds([this.currentLocationLayer.getLayers()[0]._latlng, latLng]);
      this.routeControl.getPlan().spliceWaypoints(0, 2, this.resolveStartingPoint(), latLng);
    });
    this.popupRef.instance.onInfoButtonClicked.subscribe(() => {
      this.presentLocationInfoActionSheet(latLng, address, centerDestination);
    });

    this.appRef.attachView(this.popupRef.hostView);
    this.popupRef.onDestroy(() => {
      this.appRef.detachView(this.popupRef.hostView);
    });

    var popup = marker.bindPopup(this.popupRef.location.nativeElement, {closeButton: false, maxWidth: 500, minWidth: 250});

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

  presentLocationInfoActionSheet(latLng: any, address: string, centerPostion: boolean) {
    let actionSheet = this.actionSheetCtrl.create({
      title: address,
      buttons: [
        {
          text: 'Set as start point',
          handler: () => {
            this.startLocationLayer.clearLayers();
            this.startLocationLayer.addLayer(L.marker(latLng, {icon: this.violetIcon}));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked.');
        }
      }]
    });
    actionSheet.present();
  }

  resolveStartingPoint() {
    if (this.startLocationLayer.getLayers().length > 0) {
      return this.startLocationLayer.getLayers()[0]._latlng;
    }
    else {
      return this.currentLocationLayer.getLayers()[0]._latlng;
    }
  }

  redIcon = new L.Icon({
    iconUrl: 'assets/img/marker-icon-2x-red.png',
    shadowUrl: 'assets/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  violetIcon = new L.Icon({
    iconUrl: 'assets/img/marker-icon-2x-violet.png',
    shadowUrl: 'assets/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  tehranMainTrafficZonePolygon = L.polygon([
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
  ]);

}