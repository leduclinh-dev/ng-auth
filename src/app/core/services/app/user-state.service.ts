import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "../../models/user.model";
import {LocalStorageService} from "./local-storage.service";
import * as CONST from '../../constant';

@Injectable({providedIn: 'root'})
export class UserStateService {
    userState$: Observable<UserModel | null>;
    private _userState$: BehaviorSubject<UserModel | null>

    constructor(private _localStorageService: LocalStorageService) {
        this._userState$ = new BehaviorSubject<UserModel | null>(
            this.getUserState()
        );
        this.userState$ = this._userState$.asObservable();
    }

    getUserState(): UserModel | null {
        return this._localStorageService.get(CONST.LOCAL_STORAGE_KEYS.USER_INFO);
    }

    setUserState(userState: UserModel) {
        this._localStorageService.set(
            CONST.LOCAL_STORAGE_KEYS.USER_INFO,
            userState
        );
        this._userState$.next(userState);
    }

    removeUserState() {
        this._localStorageService.remove(CONST.LOCAL_STORAGE_KEYS.USER_INFO);
        return this._userState$.next(this.getUserState());
    }
}
