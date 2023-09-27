import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class LocalStorageService {
    private _localStorage: Storage = window.localStorage;

    set(key: string, value: any): void {
        const item: string = JSON.stringify(value);
        this._localStorage.setItem(key, item);
    }

    get(key: string) {
        const value = this._localStorage.getItem(key)
        return value ? JSON.parse(value) : null;
    }

    remove(key: string): void {
        this._localStorage.removeItem(key);
    }
}
