import { Injectable, ComponentFactoryResolver, Injector,
         ComponentRef, ApplicationRef, EventEmitter, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';
import 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import 'leaflet-overpass-layer';
import 'leaflet-control-geocoder';
import 'leaflet.tilelayer.pouchdbcached';
import moment from 'moment';
import 'moment-duration-format';

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
  currentLocationLayer: any = new L.LayerGroup([]);
  startLocationLayer: any = new L.LayerGroup([]);
  onlineUserLayer: any = new L.LayerGroup([]);
  highlightLayer: any = new L.LayerGroup([]);
  overpassLayer: any = new L.LayerGroup([]);
  popupsLayer: any = new L.LayerGroup([]);
  overpassQuery: any = new L.LayerGroup([]);
  currentZoom: number;
  popupRef: ComponentRef<AddressPopup>;
  isCenterToCurrentLocation: boolean;
  activeRoute: any;
  onActiveRouteChangeEvent = new EventEmitter;
  isInDrivingMode: boolean = false;
  lastTimeCarSpeedSent: any = moment();
  destination: AddressDTO;
  showAlternatives: boolean = false;

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector,
              private applicationRef: ApplicationRef, private overpassUtil: OverpassUtil,
              private geocodingService: GeocodingService, private settings: Settings) {
  }

  init() {
    if (this.map) {
      return;
    }
    this.initCurrentZoom();

    this.map = L.map('map', {
      attributionControl: false
    });

    let tileLayer = L.tileLayer(TILE_API_BASE_URL + '/{z}/{x}/{y}.png', {
      attribution: 'Navio | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      attributionPrefix: '',
      maxZoom: 18,
      opacity: .7,
      useCache: true
    }).addTo(this.map);

    tileLayer.on({
      tilecachehit: (e) => {
        console.log("Cache HIT, ", e.url);
      },
      tilecachemiss: (e) => {
        console.log("Cache MISS, ", e.url);
      }
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
        styles: [{color: 'red', opacity: 0.4, weight: 8}]
      },
      createMarker: function(i: number, waypoint: any, total: number) {
        if (i === 0) {
          return false;
        }
        return L.marker(waypoint.latLng, { draggable: true });
      },
      autoRoute: true,
      show: false,
      showAlternatives: true,
      routeWhileDragging: true,
      addWaypoints: false
    }).addTo(this.map);

    this.routeControl.on({
      routingstart: (e) => {
        this.reOrganizeRouterUrlParameters();
      },
      routesfound: (e) => {
        // console.log("Route found: ", e.routes[0]);
        // this.setActiveRoute(e.routes[0]);
      },
      routeselected: (e) => {
        console.log("Route selected: ", e);
        this.setActiveRoute(e.route);
      }
    });

    this.initalizeOverpassQuery();
    this.overpassUtil.onOverpassSettingsChangeEvent.subscribe(() => {
      this.initalizeOverpassQuery();
      this.overpassLayer.clearLayers();
      if (this.currentZoom > 14) {
        this.overpassLayer.addLayer(this.overpassQuery);
      }
    });

    this.currentLocationLayer.addTo(this.map);
    this.startLocationLayer.addTo(this.map);
    this.onlineUserLayer.addTo(this.map);
    this.highlightLayer.addTo(this.map);
    this.overpassLayer.addTo(this.map);
    this.popupsLayer.addTo(this.map);

    this.map.on({
      contextmenu: (e) => {     // Long press event
        // this.zone.run( () => {  // Run it in Angular zone, necessary to make component creation to work, but it seems is not necessary anymore!
        this.showDestinationByLatLng(e.latlng);
        // });
      },
      click: (e) => {
        this.popupsLayer.clearLayers();
      },
      zoomend: (e) => {
        this.currentZoom = e.target._zoom;
        this.settings.setValue(Settings.LAST_ZOOM_LEVEL_KEY, this.currentZoom);
        if (this.currentZoom > 14) {
          if (this.overpassLayer.getLayers().length === 0) {
            this.overpassLayer.addLayer(this.overpassQuery);
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
      },
      moveend: (e) => {
        if (this.currentZoom > 14) {
          // Issue #24 Online users visiable on the map, is deactivated for now. refs: https://trello.com/c/bgPyzw51/51-display-online-users
          // For activating it again? uncomment following lines:
          // this.trackingService.allUserLocations(this.map.getBounds()).subscribe((res) => {
          //   this.refreshOnlineUsersLayer(res);
          // });
        }
        else {
          this.onlineUserLayer.clearLayers();
        }
      }
    });

    this.addHighlightLayers();
    this.settings.onSettingsChangeEvent.subscribe(() => {
      this.highlightLayer.clearLayers();
      this.addHighlightLayers();
    });

    this.centerToCurrentLocation();
  }

  setActiveRoute(route) {
    this.activeRoute = route;
    this.activeRoute.ETA = moment().add(moment.duration(this.activeRoute.summary.totalTime, 'seconds')).format('h:mm A');
    this.activeRoute.duration = moment.duration(this.activeRoute.summary.totalTime, 'seconds').format('h [hrs], m [min]');
    this.activeRoute.distance = (this.activeRoute.summary.totalDistance / 1000).toFixed(1) + ' km';
    this.isInDrivingMode = true;
    this.onActiveRouteChangeEvent.emit();
    this.destination = new AddressDTO(route.inputWaypoints[1].latLng, '');
  }

  initCurrentZoom() {
    this.settings.getValue(Settings.LAST_ZOOM_LEVEL_KEY).then(val => {
      if (!val) {
        this.currentZoom = 18;
      } else {
        this.currentZoom = val;
      }
    });
  }

  currentLocation() {
    if (this.currentLocationLayer.getLayers()[0]) {
      return this.currentLocationLayer.getLayers()[0]._latlng;
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
    let destinationPoints = GeoUtil.aPolygonWithTwoPoints([this.resolveStartingPoint().lat, this.resolveStartingPoint().lng], [this.destination.latlng.lat, this.destination.latlng.lng]);
    if (!this.settings.allSettings[Settings.HAS_TEHRAN_MAIN_TRAFFIC_CERTIFICATE]) {
      if (new TehranEvenOddTrafficSpecification().isAllowedToday(this.settings.allSettings[Settings.CAR_PLATE_NUMBER_EVEN_OR_ODD])) {
        if (GeoUtil.intersectPolygon(destinationPoints, TehranMainTrafficSpecification.polygonPoints())) {
          if (new TehranMainTrafficSpecification().isCurrentTimeBetweenForbiddenTime()) {
            this.routeControl.getRouter().options.urlParameters = {
              'ch.disable': true,
              block_area: TehranMainTrafficSpecification.blockedAreaPoints()
            }
          }
        }
      }
      else {
        if (GeoUtil.intersectPolygon(destinationPoints, TehranEvenOddTrafficSpecification.polygonPoints())) {
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
    return this.showDestinationPopup(addressDTO, true);
  }

  showDestinationByLatLng(latlng: LatLng) {
    this.popupsLayer.clearLayers();
    this.geocodingService.reverse(latlng, this.currentZoom).subscribe(addressDTO => {
      return this.showDestinationPopup(addressDTO, false);
    }, error => {
      return this.showDestinationPopup(new AddressDTO(latlng, "Unknown"), false);
    })
  }

  showDestinationPopup(addressDTO: AddressDTO, centerDestination: boolean) {
    if (centerDestination) {
      this.map.setView([addressDTO.latlng.lat, addressDTO.latlng.lng], this.currentZoom);
    }
    var marker = L.marker(addressDTO.latlng, {icon: this.redIcon, draggable: true});
    this.popupsLayer.addLayer(marker);

    if (this.popupRef) { this.popupRef.destroy(); }
    const compFactory = this.resolver.resolveComponentFactory(AddressPopup);
    this.popupRef = compFactory.create(this.injector);
    this.popupRef.instance.address = addressDTO;
    this.popupRef.instance.onGoButtonClicked.subscribe(x => {
      this.navigateToAddress(addressDTO);
    });
    this.popupRef.instance.onInfoButtonClicked.subscribe(() => {
      this.popupsLayer.clearLayers();
    });

    this.applicationRef.attachView(this.popupRef.hostView);
    this.popupRef.onDestroy(() => {
      this.applicationRef.detachView(this.popupRef.hostView);
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
    return marker;
  }

  navigateToAddress(addressDTO: AddressDTO) {
    this.destination = addressDTO;
    this.reOrganizeRouterUrlParameters();
    this.popupsLayer.clearLayers();
    this.map.fitBounds([this.resolveStartingPoint(), addressDTO.latlng]);
    this.routeControl.getPlan().spliceWaypoints(0, 2, this.resolveStartingPoint(), addressDTO.latlng);
  }

  stopTheRoute() {
    this.popupsLayer.clearLayers();
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
    this.startLocationLayer.clearLayers();
    this.startLocationLayer.addLayer(L.marker(address.latlng, {icon: this.violetIcon}));
  }

  resolveStartingPoint() {
    if (this.startLocationLayer.getLayers().length > 0) {
      return this.startLocationLayer.getLayers()[0]._latlng;
    }
    else {
      return this.currentLocationLayer.getLayers()[0]._latlng;
    }
  }

  shouldWeSendCarSpeed(): boolean {
    if (!this.isInDrivingMode) {
      return false;
    }
    if (moment().diff(this.lastTimeCarSpeedSent, 'seconds') > 60) {  // 60 seconds is our sending frequency for now.
      this.lastTimeCarSpeedSent = moment();
      return true;
    }
    else {
      return false;
    }
  }

  refreshOnlineUsersLayer(uls: UserLocationDTO[]) {
    this.onlineUserLayer.clearLayers();
    if (uls) {
      uls.forEach(ul => {
        this.onlineUserLayer.addLayer(L.marker({ lat: ul.latitude, lng: ul.longitude}, {icon: this.onlinUserIcon})
            .bindPopup(ul.userId ? ul.userId : 'Driver'));
      });
    }
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
      this.overpassQuery = new L.LayerGroup([]);
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