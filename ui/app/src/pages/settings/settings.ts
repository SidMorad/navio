import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavParams, ViewController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Settings } from '../../providers';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {

  options: any;
  settingsReady = false;
  form: FormGroup;

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';

  tehranProfile = {
    page: 'tehranSettings',
    pageTitleKey: 'TEHRAN_SETTINGS_TITLE'
  }

  subSettings: any = SettingsPage;

  countries: string[];
  cities: string[];

  constructor(private settings: Settings, private navParams: NavParams,
              private formBuilder: FormBuilder, private viewCtrl: ViewController,
              private translateService: TranslateService, private platform: Platform) {
  }

  ngOnInit() {
    this.loadCountriesAndCities();
    this.translateService.onLangChange.subscribe( data => {
      if (data.lang === 'fa') {
        this.platform.setDir('rtl', true);
      }
      else {
        this.platform.setDir('ltr', true);
      }
      this.platform.setLang(data.lang, true);
      this.loadCountriesAndCities();
    });
  }

  _buildForm() {
    let group: any = {
      preferLanguage: [this.options.preferLanguage],
      country: new FormControl({value: this.options.country, disabled: true}),
      city: [this.options.city]
    };

    switch(this.page) {
      case 'main':
        break;
      case 'tehranSettings':
        group = {
          highlightTehranMainTrafficZone: [this.options.highlightTehranMainTrafficZone],
          hasTehranMainTrafficCertificate: [this.options.hasTehranMainTrafficCertificate]
        };
        break;
    }
    this.form = this.formBuilder.group(group)

    // Watch the form changes
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
      this.translateService.use(this.settings.allSettings.preferLanguage);
    });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build and empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;
      this._buildForm();
    });
  }

  loadCountriesAndCities() {
    this.translateService.get('COUNTRIES').subscribe((res: string[]) => {
      this.countries = res;
    });
    this.translateService.get('CITIES').subscribe((res: string[]) => {
      this.cities = res;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  noOnChanges() {
    console.log('Ng On Changes');
  }

}