import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Settings, Favorites } from '../providers';
import { InMemoryStorage } from '../shared/storage/in-memory-storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class FileStorage {

  _readyPromise: Promise<any>;

  constructor(public storage: Storage, public inMemoryStorage: InMemoryStorage) {
    inMemoryStorage.onStoreToFileEvent.subscribe((ev) => {
      console.log("onStoreToFileEvent triggered!");
      this.set(ev.key, ev.value);
    });
    inMemoryStorage.onDeleteFromFileEvent.subscribe((key) => {
      console.log("onDeleteFromFileEvent triggered!");
      this.remove(key);
    });
  }

  set(key: string, value: any) {
    return this.storage.set(key, value);
  }

  get(key: string) {
    return this.storage.get(key);
  }

  remove(key: string) {
    this.storage.remove(key);
  }

  loadSettings() {
    return this.get(Settings.SETTINGS_KEY).then((value) => {
      if (value) {
        this.inMemoryStorage.setValue(Settings.SETTINGS_KEY, value, false);
      }
    });
  }

  loadFavorites() {
    return this.get(Favorites.FAVORITES_KEY).then((value) => {
      if (value) {
        this.inMemoryStorage.setValue(Favorites.FAVORITES_KEY, value, false);
      }
    });
  }

}