import { Injectable } from '@angular/core';
import { InMemoryStorage } from '../shared/storage/in-memory-storage';

import { AddressDTO } from '../domain/model/geocoding';

@Injectable()
export class Favorites {

  public static readonly FAVORITES_KEY: string = 'FAVORITES';
  favorites: any = {};

  constructor(private inMemoryStorage: InMemoryStorage) {
  }

  load() {
    let val = this.inMemoryStorage.getValue(Favorites.FAVORITES_KEY);
    if (val) {
      this.favorites = JSON.parse(val);
    }
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

  set(addresses: AddressDTO[]) {
    this.favorites = {};
    addresses.forEach(addr => {
      this.favorites[this.keyFor(addr)] = addr;
    });
    return this.save();
  }

  save() {
    this.inMemoryStorage.setValue(Favorites.FAVORITES_KEY, JSON.stringify(this.favorites), true);
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