import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class InMemoryStorage {

  public static readonly AUTH_TOKEN_KEY = 'authenticationToken';

  memoryStore = {};
  onStoreToFileEvent = new EventEmitter();
  onDeleteFromFileEvent = new EventEmitter();

  getValue(key: string) {
    console.log("IN_MEMORY_STORAGE#GET: key: ", key, " Value: ", this.memoryStore[key]);
    return this.memoryStore[key];
  }

  setValue(key: string, value: any, persistIt: boolean) {
    console.log("IN_MEMORY_STORAGE#SET: key [", key, "] value [", value, "]");
    this.memoryStore[key] = value;
    if (persistIt) {
      this.onStoreToFileEvent.emit({key: key, value: value});
    }
  }

  clear(key: string, persistIt: boolean) {
    delete this.memoryStore[key];
    if (persistIt) {
      this.onDeleteFromFileEvent.emit(key);
    }
  }

}