import { Injectable, ComponentFactoryResolver, Injector,
         ComponentRef, ApplicationRef, NgZone, EventEmitter } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import 'leaflet-overpass-layer';
import 'leaflet-control-geocoder';

import { LeafletPopupComponent } from '../pages';
import { TILE_API_BASE_URL, ROUTE_API_BASE_URL, OVERPASS_API_BASE_URL } from '../app/config';
import { GeocodingService } from '.';
import { Settings } from '../providers';
import { TehranMainTrafficSpecification,
         TehranEvenOddTrafficSpecification } from '../domain/model/tehran';
import { AddressDTO } from '../domain/model/geocoding';

declare var L: any;

@Injectable()
export class MapService {
  map: any;
  routeControl: any;
  currentLocationLayer: any = new L.LayerGroup([]);
  startLocationLayer: any = new L.LayerGroup([]);
  highlightLayer: any = new L.LayerGroup([]);
  overpassLayer: any = new L.LayerGroup([]);
  popupsLayer: any = new L.LayerGroup([]);
  speedCameraLayer: any;
  currentZoom: number;
  popupRef: ComponentRef<LeafletPopupComponent>;
  isCenterToCurrentLocation: boolean;
  activeRoute: any;
  onActiveRouteChangeEvent = new EventEmitter;

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
      if (!val) {
        this.currentZoom = 18;
      } else {
        this.currentZoom = val;
      }
    });

    this.map = L.map('map', {
      attributionControl: false
    });

    L.tileLayer(TILE_API_BASE_URL + '/{z}/{x}/{y}.png', {
      attribution: 'Rahpey | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      attributionPrefix: '',
      maxZoom: 18,
      opacity: .7
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
         }
      }),
      // geocoder: L.Control.Geocoder.nominatim({
      //   serviceUrl: GEOCODING_API_BASE_URL
      // }),
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

    this.routeControl.on({
      routesfound: (e) => {
        this.activeRoute = e.routes[0];
        this.onActiveRouteChangeEvent.emit();
      }
    });

    this.speedCameraLayer = new L.OverPassLayer({
       endPoint: OVERPASS_API_BASE_URL,
       query: 'node({{bbox}})[highway=speed_camera];out qt;',
       minZoom: 15,
       timeout: 30 * 1000, // Milliseconds
       retryOnTimeout: false,
       minZoomIndicatorEnabled: false,
       markerIcon: this.speedCameraIcon,
       debug: false,
    });

    this.currentLocationLayer.addTo(this.map);
    this.startLocationLayer.addTo(this.map);
    this.highlightLayer.addTo(this.map);
    this.overpassLayer.addTo(this.map);
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
        this.settings.setValue(Settings.LAST_ZOOM_LEVEL_KEY, this.currentZoom);
        if (this.currentZoom > 14) {
          if (this.overpassLayer.getLayers().length === 0) {
            this.overpassLayer.addLayer(this.speedCameraLayer);
          }
        } else {
          this.overpassLayer.clearLayers();
        }
      },
      movestart: (e) => {
        if (this.isCenterToCurrentLocation) {
          if (!this.map.getCenter().equals(this.currentLocation())) {
            this.isCenterToCurrentLocation = false;
          }
        }
      }
    });

    this.addHighlightLayers();
    this.settings.onSettingsChangeEvent.subscribe(() => {
      this.highlightLayer.clearLayers();
      this.addHighlightLayers();
      this.reOrganizeRouterUrlParameters();
    });

    this.centerToCurrentLocation();
  }

  currentLocation() {
    if (this.currentLocationLayer.getLayers()[0]) {
      return this.currentLocationLayer.getLayers()[0]._latlng;
    }
    return null;
  }

  centerToCurrentLocation() {
    if (this.currentLocation()) {
      if (!this.currentZoom) {  // In case watchPosition callback happens sooner than settings callback
        this.currentZoom = 18;
      }
      this.map.setView(this.currentLocation(), this.currentZoom);
      this.isCenterToCurrentLocation = true;
    }
  }

  reOrganizeRouterUrlParameters() {
    this.settings.getValue(Settings.HAS_TEHRAN_MAIN_TRAFFIC_CERTIFICATE).then(val => {
      if (val === true) {
        this.routeControl.getRouter().options.urlParameters = {};
      }
      else {
        this.settings.getValue(Settings.CAR_PLATE_NUMBER_EVEN_OR_ODD).then(val => {
          if (new TehranEvenOddTrafficSpecification().isAllowedToday(val)) {
            if (new TehranMainTrafficSpecification().isCurrentTimeBetweenForbiddenTime()) {
              this.routeControl.getRouter().options.urlParameters = {
                'ch.disable': true,
                block_area: TehranMainTrafficSpecification.blockedAreaPoints()
              }
            }
            else {
              this.routeControl.getRouter().options.urlParameters = {};
            }
          }
          else {
            if (new TehranEvenOddTrafficSpecification().isCurrentTimeBetweenForbiddenTime()) {
              this.routeControl.getRouter().options.urlParameters = {
                'ch.disable': true,
                block_area: TehranEvenOddTrafficSpecification.blockedAreaPoints()
              }
            }
            else {
              this.routeControl.getRouter().options.urlParameters = {};
            }
          }
        });
      }
    });
  }

  addHighlightLayers() {
    this.settings.getValue(Settings.HIGHLIGHT_TEHRAN_MAIN_TRAFFIC_ZONE).then(val => {
      if (val === true) {
        this.highlightLayer.addLayer(this.tehranMainTrafficZonePolygon);
      }
    });
    this.settings.getValue(Settings.HIGHLIGHT_TEHRAN_EVEN_ODD_TRAFFIC_ZONE).then(val => {
      if (val === true) {
        this.highlightLayer.addLayer(this.tehranEvenOddTrafficZonePloygon);
      }
    })
  }

  showDestination(addressDTO: AddressDTO) {
    this.showDestinationPopup(addressDTO.latlng, addressDTO.name, true);
  }

  showDestinationByLatLng(latlng: any) {
    this.popupsLayer.clearLayers();
    this.geocodingService.reverse(latlng).subscribe(addressDTO => {
      this.showDestinationPopup(latlng, addressDTO.name, false);
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
      this.map.fitBounds([this.resolveStartingPoint(), latLng]);
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

  LeafIcon = L.Icon.extend({
    options: {
      shadowUrl: 'assets/img/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }
  });

  redIcon = new this.LeafIcon({
    iconUrl: 'assets/img/marker-icon-2x-red.png'
  });

  violetIcon = new this.LeafIcon({
    iconUrl: 'assets/img/marker-icon-2x-violet.png'
  });

  speedCameraIcon = new this.LeafIcon({
    iconUrl: 'assets/img/speed-camera.png'
  });

  tehranMainTrafficZoneRectangle = L.rectangle(
    TehranMainTrafficSpecification.rectanglePoints(), {
      color: 'red'
    }
  );

  tehranMainTrafficZonePolygon = L.polygon(
    TehranMainTrafficSpecification.polygonPoints(), {
    color: 'red',
    weight: 8,
    opacity: .5,
    dashArray: '20,15',
    lineJoin: 'round',
    fillColor: 'pink',
    fillOpacity: 0.0
  });

  tehranEvenOddTrafficZoneRectangle = L.rectangle(
    TehranEvenOddTrafficSpecification.rectanglePoints(), {
      color: 'red'
    }
  );

  tehranEvenOddTrafficZonePloygon = L.polygon(
    TehranEvenOddTrafficSpecification.polygonPoints(), {
    color: 'red',
    weight: 8,
    opacity: .5,
    dashArray: '20,15',
    lineJoin: 'round',
    fillColor: 'pink',
    fillOpacity: 0.0
  });
}