import { Injectable, ComponentFactoryResolver, Injector,
         ComponentRef, ApplicationRef, EventEmitter } from '@angular/core';
import { ToastController } from 'ionic-angular';
import 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import 'leaflet-overpass-layer';
// import 'leaflet-control-geocoder';
import 'leaflet.tilelayer.pouchdbcached';
import moment from 'moment';
import 'moment-duration-format';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { TranslateService } from '@ngx-translate/core';

import { AddressPopup } from '../pages';
import { TILE_API_BASE_URL, ROUTE_API_BASE_URL, OVERPASS_API_BASE_URL } from '../app/config';
import { GeocodingService } from '../services/geocoding.service';
import { Settings, GeoUtil, OverpassUtil } from '../providers';
import { TehranMainTrafficSpecification,
         TehranEvenOddTrafficSpecification } from '../domain/model/tehran';
import { AddressDTO, LatLng, UserLocationDTO } from '../domain/model';

declare var L: any;

@Injectable()
export class Map {
  map: any;
  routeControl: any;
  currentLocationLayerGroup: any = new L.LayerGroup([]);
  startLocationLayerGroup: any = new L.LayerGroup([]);
  onlineUserLayerGroup: any = new L.LayerGroup([]);
  highlightLayerGroup: any = new L.LayerGroup([]);
  overpassLayerGroup: any = new L.LayerGroup([]);
  popupsLayerGroup: any = new L.LayerGroup([]);
  tileLayerGroup: any = new L.LayerGroup([]);
  overpassQuery: any = new L.Layer();
  currentZoom: number;
  popupRef: ComponentRef<AddressPopup>;
  isCenterToCurrentLocation: boolean;
  activeRoute: any;
  onActiveRouteChangeEvent = new EventEmitter;
  isInDrivingMode: boolean = false;
  lastTimeCarSpeedSent: any = moment();
  lastTimeMapInteracted: any = moment();
  destination: AddressDTO;
  showAlternatives: boolean = false;

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector,
    private applicationRef: ApplicationRef, private overpassUtil: OverpassUtil,
    private geocodingService: GeocodingService, private settings: Settings,
    private loadingBarService: LoadingBarService, private toastCtrl: ToastController,
    private translateService: TranslateService) {
  }

  init() {
    if (this.map) {
      return;
    }
    this.initCurrentZoom();

    this.map = L.map('map', {
      attributionControl: false
    });

    this.map.addControl(L.control.attribution({
      position: 'topright',
      prefix: ''
    }));

    this.routeControl = L.Routing.control({
      router: L.Routing.graphHopper('', {
        serviceUrl: ROUTE_API_BASE_URL + '/get',
        urlParameters: {
        }
      }),
      // geocoder: L.Control.Geocoder.nominatim({
      //   serviceUrl: GEOCODING_API_BASE_URL
      // }),
      lineOptions: {
        styles: [{color: 'blue', opacity: 0.4, weight: 8}]
      },
      altLineOptions: {
        styles: [{color: 'gray', opacity: 0.8, weight: 8}]
      },
      createMarker: function(i: number, waypoint: any, total: number) {
        if (i === 0 && total > 1) {
          return false;
        }
        return L.marker(waypoint.latLng, { draggable: true });
      },
      autoRoute: true,
      show: false,
      showAlternatives: true,
      routeWhileDragging: true,
      addWaypoints: false,
      collapsible: true,
      collapseBtnClass: 'leaflet-routing-collapse-btn'
    }).addTo(this.map);

    this.routeControl.on({
      routingstart: () => {
        this.reOrganizeRouterUrlParameters();
      },
      routesfound: () => {
        // console.log("Route found: ", e.routes[0]);
        // this.setActiveRoute(e.routes[0]);
      },
      routeselected: (e) => {
        console.log("Route selected: ", e);
        this.setActiveRoute(e.route);
      },
      routingerror: (e) => {
        console.log("Route error: ", e);
        this.translateService.get('ERROR_OCCURRED_ON_FINDING_ROUTE_PLEASE_TRY_AGAIN').subscribe((translatedMessage) => {
          let hint = "";
          if (e.error && e.error.response && e.error.response.message) {
            hint = "\n Hint: " + e.error.response.message;
          }
          this.toastCtrl.create({
            message: translatedMessage + hint,
            duration: 5000,
            position: 'top',
            cssClass: 'white-space-pre-line'
          }).present();
        });
      }
    });

    this.tileLayerGroup.addLayer(this.tileLayer());
    this.tileLayerGroup.addTo(this.map);

    this.initalizeOverpassQuery();
    this.overpassUtil.onOverpassSettingsChangeEvent.subscribe(() => {
      this.initalizeOverpassQuery();
      this.overpassLayerGroup.clearLayers();
      if (this.currentZoom > 14) {
        this.overpassLayerGroup.addLayer(this.overpassQuery);
      }
    });

    this.currentLocationLayerGroup.addTo(this.map);
    this.startLocationLayerGroup.addTo(this.map);
    this.onlineUserLayerGroup.addTo(this.map);
    this.highlightLayerGroup.addTo(this.map);
    this.overpassLayerGroup.addTo(this.map);
    this.popupsLayerGroup.addTo(this.map);

    this.map.on({
      contextmenu: (e) => {     // Long press event
        console.log("Contextmenu event triggered, event: ", e);
        this.loadingBarService.startLoading();
        // this.zone.run( () => {  // Run it in Angular zone, necessary to make component creation to work, but it seems is not necessary anymore!
        this.showDestinationByLatLng(e.latlng, false, this.currentZoom);
        // });
        this.lastTimeMapInteracted = moment();
      },
      click: () => {
        this.popupsLayerGroup.clearLayers();
        this.lastTimeMapInteracted = moment();
      },
      zoomend: (e) => {
        this.currentZoom = e.target._zoom;
        this.settings.setValue(Settings.LAST_ZOOM_LEVEL_KEY, this.currentZoom);
        if (this.currentZoom > 14) {
          if (this.overpassLayerGroup.getLayers().length === 0) {
            this.overpassLayerGroup.addLayer(this.overpassQuery);
          }
        } else {
          this.overpassLayerGroup.clearLayers();
        }
        this.lastTimeMapInteracted = moment();
      },
      movestart: () => {
        if (this.isCenterToCurrentLocation) {
          if (!this.map.getCenter().equals(this.currentLocation())) {
            this.isCenterToCurrentLocation = false;
          }
        }
        this.lastTimeMapInteracted = moment();
      },
      moveend: () => {
        if (this.currentZoom > 14) {
          // Issue #24 Online users visiable on the map, is deactivated for now. refs: https://trello.com/c/bgPyzw51/51-display-online-users
          // For activating it again? uncomment following lines:
          // this.trackingService.allUserLocations(this.map.getBounds()).subscribe((res) => {
          //   this.refreshOnlineUsersLayer(res);
          // });
        }
        else {
          this.onlineUserLayerGroup.clearLayers();
        }
        this.lastTimeMapInteracted = moment();
      },
      load: () => {
        this.lastTimeMapInteracted = moment();
      }
    });

    this.addHighlightLayers();
    this.settings.onSettingsChangeEvent.subscribe(() => {
      this.highlightLayerGroup.clearLayers();
      this.addHighlightLayers();
      this.tileLayerGroup.clearLayers();
      this.tileLayerGroup.addLayer(this.tileLayer());
    });

    this.centerToCurrentLocation();
    let me = this;
    setInterval(me.checkInactivityInDrivingMode, 1000, me);
  }

  checkInactivityInDrivingMode(me) {
    if (me.isInDrivingMode) {
      if (moment().diff(me.lastTimeMapMoved, 'seconds') > 5) { // 5 seconds inactivity event
        me.centerToCurrentLocation();
        me.lastTimeMapMoved = moment();
      }
    }
  }

  setActiveRoute(route) {
    this.activeRoute = route;
    this.activeRoute.ETA = moment().add(moment.duration(this.activeRoute.summary.totalTime, 'seconds')).format('h:mm A');
    this.activeRoute.duration = moment.duration(this.activeRoute.summary.totalTime, 'seconds').format('h [hrs], m [min]');
    this.activeRoute.distance = (this.activeRoute.summary.totalDistance / 1000).toFixed(1) + ' km';
    this.isInDrivingMode = true;
    this.onActiveRouteChangeEvent.emit();
    this.geocodingService.reverse(route.inputWaypoints[1].latLng, this.currentZoom).subscribe((result) => {
      this.destination = result;
    });
    let me = this;
    setTimeout(function() {
      if (moment().diff(me.lastTimeMapInteracted, 'seconds') >= 3) {
        me.map.flyTo(me.currentLocation(), 16, {
          animate: true,
          duration: 1
        });
      }
    }, 4000);
  }

  initCurrentZoom() {
    let val = this.settings.getValue(Settings.LAST_ZOOM_LEVEL_KEY);
    if (!val) {
      this.currentZoom = 18;
    } else {
      this.currentZoom = val;
    }
  }

  currentLocation() {
    if (this.currentLocationLayerGroup.getLayers()[0]) {
      return this.currentLocationLayerGroup.getLayers()[0]._latlng;
    }
    return null;
  }

  centerToCurrentLocation() {
    if (this.currentLocation()) {
      if (this.currentZoom) {
        this.map.setView(this.currentLocation(), this.currentZoom);
        this.isCenterToCurrentLocation = true;
        return true;
      }
      else {
        this.initCurrentZoom();
      }
    }
    return false;
  }

  reOrganizeRouterUrlParameters() {
    this.routeControl.getRouter().options.urlParameters = {};
    let destinationPoints = [[this.resolveStartingPoint().lat, this.resolveStartingPoint().lng], [this.destination.latlng.lat, this.destination.latlng.lng]];
    if (!this.settings.allSettings[Settings.HAS_TEHRAN_MAIN_TRAFFIC_CERTIFICATE]) {
      if (new TehranEvenOddTrafficSpecification().isAllowedToday(this.settings.allSettings[Settings.CAR_PLATE_NUMBER_EVEN_OR_ODD])) {
        if (GeoUtil.intersectRect(destinationPoints, TehranMainTrafficSpecification.rectanglePoints())) {
          if (new TehranMainTrafficSpecification().isCurrentTimeBetweenForbiddenTime()) {
            this.routeControl.getRouter().options.urlParameters = {
              'ch.disable': true,
              block_area: TehranMainTrafficSpecification.blockedAreaPoints()
            }
          }
        }
      }
      else {
        if (GeoUtil.intersectRect(destinationPoints, TehranEvenOddTrafficSpecification.rectanglePoints())) {
          if (new TehranEvenOddTrafficSpecification().isCurrentTimeBetweenForbiddenTime()) {
            this.routeControl.getRouter().options.urlParameters = {
              'ch.disable': true,
              block_area: TehranEvenOddTrafficSpecification.blockedAreaPoints()
            }
          }
        }
      }
    }
    if (this.showAlternatives) {
      this.routeControl.getRouter().options.urlParameters.algorithm = 'alternative_route';
      this.routeControl.getRouter().options.urlParameters['ch.disable'] = true;
      this.routeControl.getRouter().options.urlParameters['alternative_route.max_paths'] = 3;
    }
    console.log("Route params are set: ", this.routeControl.getRouter().options.urlParameters);
  }

  removeAlternativeRoutes() {
    this.showAlternatives = false;
    if (this.activeRoute) {
      this.routeControl.setAlternatives([this.activeRoute]);
    }
  }

  addHighlightLayers() {
    if (this.settings.getValue(Settings.HIGHLIGHT_TEHRAN_MAIN_TRAFFIC_ZONE) === true) {
      this.highlightLayerGroup.addLayer(this.tehranMainTrafficZonePolygon);
    }
    if (this.settings.getValue(Settings.HIGHLIGHT_TEHRAN_EVEN_ODD_TRAFFIC_ZONE) === true) {
      this.highlightLayerGroup.addLayer(this.tehranEvenOddTrafficZonePloygon);
    }
  }

  showDestination(addressDTO: AddressDTO) {
    return this.showDestinationPopup(addressDTO, true);
  }

  showDestinationByLatLng(latlng: LatLng, centerToPosition: boolean, zoom: number) {
    this.popupsLayerGroup.clearLayers();
    this.geocodingService.reverse(latlng, zoom).subscribe(addressDTO => {
      return this.showDestinationPopup(addressDTO, centerToPosition);
    }, (error) => {
      console.log("Error on geo revese search", error);
      return this.showDestinationPopup(new AddressDTO(latlng, "Unknown"), centerToPosition);
    })
  }

  showDestinationPopup(addressDTO: AddressDTO, centerDestination: boolean) {
    if (centerDestination) {
      this.map.panTo(new L.latLng(addressDTO.latlng.lat, addressDTO.latlng.lng));
    }
    var marker = L.marker(addressDTO.latlng, {icon: this.redIcon, draggable: true});
    this.popupsLayerGroup.addLayer(marker);

    if (this.popupRef) { this.popupRef.destroy(); }
    const compFactory = this.resolver.resolveComponentFactory(AddressPopup);
    this.popupRef = compFactory.create(this.injector);
    this.popupRef.instance.address = addressDTO;
    this.popupRef.instance.onGoButtonClicked.subscribe(() => {
      this.navigateToAddress(addressDTO);
    });
    this.popupRef.instance.onInfoButtonClicked.subscribe(() => {
      this.popupsLayerGroup.clearLayers();
    });

    this.applicationRef.attachView(this.popupRef.hostView);
    this.popupRef.onDestroy(() => {
      this.applicationRef.detachView(this.popupRef.hostView);
    });

    var popup = marker.bindPopup(this.popupRef.location.nativeElement, {closeButton: false, maxWidth: 300, minWidth: 200, maxHeight: 150});

    var firstTime = true;
    popup.on({
      popupopen: (e) => {
        if(!firstTime) {
          this.showDestinationByLatLng(e.target._latlng, false, this.currentZoom);
        }
        firstTime = false;
      }
    });

    popup.openPopup();
    this.loadingBarService.endLoading();
    return marker;
  }

  reRoute() {
    this.reOrganizeRouterUrlParameters();
    this.navigateToAddress(this.destination);
  }

  navigateToAddress(addressDTO: AddressDTO) {
    this.destination = addressDTO;
    this.reOrganizeRouterUrlParameters();
    this.popupsLayerGroup.clearLayers();
    this.map.fitBounds([this.resolveStartingPoint(), addressDTO.latlng]);
    this.routeControl.getPlan().spliceWaypoints(0, 2, this.resolveStartingPoint(), addressDTO.latlng);
  }

  stopTheRoute() {
    this.popupsLayerGroup.clearLayers();
    this.routeControl.getPlan().spliceWaypoints(0, this.routeControl.getPlan().getWaypoints().length);
    this.isInDrivingMode = false;
    this.activeRoute = null;
    this.onActiveRouteChangeEvent.emit();
  }

  showAlternativeRoutes(addressDTO: AddressDTO) {
    this.showAlternatives = true;
    this.navigateToAddress(addressDTO);
  }

  setAsStartPoint(address: AddressDTO) {
    this.startLocationLayerGroup.clearLayers();
    this.startLocationLayerGroup.addLayer(L.marker(address.latlng, {icon: this.violetIcon}));
  }

  resolveStartingPoint() {
    if (this.startLocationLayerGroup.getLayers().length > 0) {
      return this.startLocationLayerGroup.getLayers()[0]._latlng;
    }
    else {
      return this.currentLocationLayerGroup.getLayers()[0]._latlng;
    }
  }

  shouldWeSendCarSpeed(): boolean {
    // if (!this.isInDrivingMode) {
    //   return false;
    // }
    if (moment().diff(this.lastTimeCarSpeedSent, 'seconds') > 60) {  // 60 seconds is our sending frequency for now.
      this.lastTimeCarSpeedSent = moment();
      return true;
    }
    else {
      return false;
    }
  }

  refreshOnlineUsersLayer(uls: UserLocationDTO[]) {
    this.onlineUserLayerGroup.clearLayers();
    if (uls) {
      uls.forEach(ul => {
        this.onlineUserLayerGroup.addLayer(L.marker({ lat: ul.latitude, lng: ul.longitude}, {icon: this.onlinUserIcon})
            .bindPopup(ul.userId ? ul.userId : 'Driver'));
      });
    }
  }

  tileLayer(): any {
    let tileLayer = L.tileLayer(TILE_API_BASE_URL + '/{z}/{x}/{y}.png', {
      attribution: 'Navio | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      attributionPrefix: '',
      maxZoom: 18,
      opacity: .7,
      useCache: this.settings.allSettings[Settings.USE_CACHE_FOR_MAP_TILES]
    }).addTo(this.map);

    tileLayer.on({
      tilecachehit: (e) => {
        console.log("Cache HIT, ", e.url);
      },
      tilecachemiss: (e) => {
        console.log("Cache MISS, ", e.url);
      }
    });
    return tileLayer;
  }

  initalizeOverpassQuery() {
    let me = this;
    if (this.overpassUtil.isNecessary()) {
      this.overpassQuery = new L.OverPassLayer({
         endPoint: OVERPASS_API_BASE_URL,
         query: this.overpassUtil.resolveQuery(),
         minZoom: 15,
         timeout: 60 * 1000, // Milliseconds
         retryOnTimeout: false,
         minZoomIndicatorEnabled: false,
         debug: false,
         onSuccess: function(data) {
           for (let i=0; i < data.elements.length; i++) {
             let pos, popup, popupContent,
             e = data.elements[i];
             if (e.id in this._ids) continue;
             this._ids[e.id] = true;

             pos = new L.LatLng(e.lat, e.lon);
             popupContent = this._getPoiPopupHTML(e.tags, e.id);
             popup = L.popup().setContent(popupContent);
             if (e.tags['highway'] === 'traffic_signals') {
               this._markers.addLayer(L.marker(pos, { icon: me.trafficLightsIcon}).bindPopup(popup));
             }
             else if (e.tags['amenity'] === 'fuel') {
               this._markers.addLayer(L.marker(pos, { icon: me.amenityFuelIcon})).bindPopup(popup)
             }
             else {
               this._markers.addLayer(L.marker(pos, { icon: me.speedCameraIcon}).bindPopup(popup));
             }
           }
         }
      });
    } else {
      this.overpassQuery = new L.Layer();
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

  onlinUserIcon = new this.LeafIcon({
    iconUrl: 'assets/img/car.png',
    iconSize: [41, 25]
  });

  trafficLightsIcon = new this.LeafIcon({
    iconUrl: 'assets/img/traffic-lights.png',
    iconSize: [15, 41]
  });

  amenityFuelIcon = new this.LeafIcon({
    iconUrl: 'assets/img/amenity-fuel.png',
    iconSize: [30, 41]
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