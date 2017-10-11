import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Settings } from '../../providers';
import { FileStorage } from '../../plugindeps/file-storage';

@IonicPage({
  priority: 'low'
})
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  options: any;
  settingsReady = false;
  form: FormGroup;

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';

  tehranProfile = {
    page: 'tehranSettings',
    pageTitleKey: 'TEHRAN_SETTINGS_TITLE'
  }

  mapSettings = {
    page: 'mapSettings',
    pageTitleKey: 'MAP_SETTINGS_TITLE'
  }

  subSettings: any = SettingsPage;

  countries: string[] = [];
  cities: string[] = [];

  constructor(private settings: Settings, private navParams: NavParams,
              private formBuilder: FormBuilder, private viewCtrl: ViewController,
              private translateService: TranslateService, private fileStorage: FileStorage) {
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.loadCountriesAndCities();
    this.translateService.onLangChange.subscribe( () => {
      this.loadCountriesAndCities();
    });
  }

  _buildForm() {
    let group: any = {
      preferLanguage: [this.options.preferLanguage],
      country: new FormControl({value: this.options.country, disabled: true}),
      city: [this.options.city]
      // userGoInvisible: [this.options.userGoInvisible]
    };

    switch(this.page) {
      case 'main':
        break;
      case 'tehranSettings':
        group = {
          highlightTehranMainTrafficZone: [this.options.highlightTehranMainTrafficZone],
          highlightTehranEvenOddTrafficZone: [this.options.highlightTehranEvenOddTrafficZone],
          hasTehranMainTrafficCertificate: [this.options.hasTehranMainTrafficCertificate],
          carPlateNumberEvenOrOdd: [this.options.carPlateNumberEvenOrOdd]
        };
        break;
      case 'mapSettings':
        group = {
          overpassShowSpeedCamera: [this.options.overpassShowSpeedCamera],
          overpassShowFuelStation: [this.options.overpassShowFuelStation],
          overpassShowTrafficLight: [this.options.overpassShowTrafficLight],
          useCacheForMapTiles: [this.options.useCacheForMapTiles],
          centerToPositionFrequently: [this.options.centerToPositionFrequently],
          autoReRoute: [this.options.autoReRoute]
        };
        break;
    }
    this.form = this.formBuilder.group(group)

    // Watch the form changes
    this.form.valueChanges.subscribe(() => {
      this.settings.merge(this.form.value);
      if (this.settings.allSettings.preferLanguage !== this.translateService.currentLang) {
        this.translateService.use(this.settings.allSettings.preferLanguage);
      }
    });
  }

  ionViewWillEnter() {
    // Build and empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.fileStorage.loadSettings().then(() => {
      this.settings.load();
      this.settingsReady = true;
      this.options = this.settings.allSettings;
      this._buildForm();
    });
  }

  loadCountriesAndCities() {
    this.translateService.get('COUNTRIES').subscribe((res: string[]) => {
      if (res) {
        this.countries = res;
      }
    });
    this.translateService.get('CITIES').subscribe((res: string[]) => {
      if (res) {
        this.cities = res;
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  noOnChanges() {
    console.log('Ng On Changes');
  }

}