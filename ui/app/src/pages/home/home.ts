import { Component, OnInit, OnDestroy, NgZone,
         ComponentRef, ComponentFactoryResolver, Injector,
         ApplicationRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';

import { LeafletPopupComponent } from '../../pages';
import { MapService } from '../../services';

declare var L: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  watchPosition: any;
  compRef: ComponentRef<LeafletPopupComponent>;

  constructor(private navCtrl: NavController, private geolocation: Geolocation,
              private platform: Platform, private zone: NgZone,
              private resolver: ComponentFactoryResolver, private injector: Injector,
              private appRef: ApplicationRef, private mapService: MapService) {

  }

  ngOnInit() {
    var map = L.map('map', {
      attributionControl: false
    });

    L.tileLayer('http://tile.webebook.org/tile/{z}/{x}/{y}.png', {
      attribution: 'Rahpey | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      attributionPrefix: '',
      maxZoom: 18
    }).addTo(map);

    map.addControl(L.control.attribution({
      position: 'topright',
      prefix: ''
    }));

    var routeControl = L.Routing.control({
      router: L.Routing.graphHopper('', {
        serviceUrl: 'http://tile.webebook.org/route'
        // urlParameters: { algorithm: 'alternative_route', 'ch.disable': true } // activating this need Graphhopper engine come up with `routing.ch.disabling_allowed=true` in it's config.properties file.
      }),
      lineOptions: {
        styles: [{color: 'blue', opacity: 0.8, weight: 2}]
      },
      autoRoute: true,
      show: false,
      // showAlternatives: true,
      routeWhileDragging: true
    }).addTo(map);

    var markersLayer = new L.LayerGroup([]);
    var popupsLayer = new L.LayerGroup([]);
    markersLayer.addTo(map);
    popupsLayer.addTo(map);

    var redIcon = new L.Icon({
      iconUrl: 'assets/img/marker-icon-2x-red.png',
      shadowUrl: 'assets/img/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    map.on({
      contextmenu: (e) => {     // Long press event
        this.zone.run( () => {  // Run it in Angular zone, neccessary to make component creation to work
          var marker = L.marker(e.latlng, {icon: redIcon});
          popupsLayer.addLayer(marker);

          if (this.compRef) { this.compRef.destroy(); }
          const compFactory = this.resolver.resolveComponentFactory(LeafletPopupComponent);
          this.compRef = compFactory.create(this.injector);
          this.compRef.instance.param = "Test";
          this.compRef.instance.onGoButtonClicked.subscribe(x => {
            console.log("goButtonClicked subscribe is working. ", x);
            popupsLayer.clearLayers();
            routeControl.getPlan().spliceWaypoints(0, 2, markersLayer.getLayers()[0]._latlng, e.latlng);
          });

          this.appRef.attachView(this.compRef.hostView);
          this.compRef.onDestroy(() => {
            this.appRef.detachView(this.compRef.hostView);
          });

          marker.bindPopup(this.compRef.location.nativeElement, {closeButton: false, maxWidth: 400, minWidth: 200}).openPopup();
        });
      }
    });

    map.on('click', function(e) {
      popupsLayer.clearLayers();
    });

    var currentZoom = 18;
    map.on('zoomend', function(e) {
      console.log("Zoom end event ", e.target._zoom);
      currentZoom = e.target._zoom;
    });

    this.platform.ready().then((readySource) => {
      var firstTime = true;
      let watchPosition = this.geolocation.watchPosition();
      watchPosition.subscribe((data) => {
        this.mapService.currentZoom = currentZoom;
        console.log("watchPosition event: ", data, " currentZoom level: ", this.mapService.currentZoom);
        markersLayer.clearLayers();
        if (firstTime) {
          map.setView([data.coords.latitude, data.coords.longitude], this.mapService.currentZoom);
          firstTime = false;
        }
        markersLayer.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
          { radius : 50}));
        markersLayer.addLayer(L.circleMarker([data.coords.latitude, data.coords.longitude],
          { radius : 10, color: 'white', fillColor: 'purple', fillOpacity: 0.5 }));
      });
      this.watchPosition = watchPosition;
    });

    this.mapService.map = map;
    this.mapService.routeControl = routeControl;
    this.mapService.popupsLayer = popupsLayer;
    this.mapService.markersLayer = markersLayer;
  }

  ngOnDestroy() {
    if (this.watchPosition) {
      this.watchPosition.unsubscribe();
    }
  }

}