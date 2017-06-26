import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AddressDTO } from '../domain/model/geocoding';

@Injectable()
export class Favorites {

  FAVORITES_KEY: string = 'FAVORITES';
  favorites: any = {};

  constructor(private storage: Storage) {
  }

  load() {
    this.storage.get(this.FAVORITES_KEY).then(val => {
      if (val) {
        this.favorites = JSON.parse(val);
      }
    });
  }

  /*
   * Adds a address to favorite list
   */
  add(address: AddressDTO) {
    this.favorites[this.keyFor(address)] = address;
    return this.save();
  }

  remove(address: AddressDTO) {
    delete this.favorites[this.keyFor(address)];
    return this.save();
  }

  save() {
    return this.storage.set(this.FAVORITES_KEY, JSON.stringify(this.favorites)).then(() => {
      console.log("Save favorites was successful ", this.favorites);
    }).catch(error => {
      console.log("Oops save favorites failed: ", error);
    });
  }

  list(): AddressDTO[] {
    let result = [];
    Object.keys(this.favorites).forEach(key => {
      result.push(this.favorites[key]);
    });
    return result;
  }

  /*
   * Checks if an address is favorite or not
   */
  isFavorite(address: AddressDTO) {
    return this.favorites[this.keyFor(address)] !== undefined;
  }

  keyFor(address: AddressDTO) {
    let key = address.latlng.lat + ',' + address.latlng.lng;
    return key;
  }

}