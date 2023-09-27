import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginInfoModel} from "../../models/login-info.model";
import {LocalStorageService} from "./local-storage.service";
import * as CONST from '../../constant';

@Injectable({providedIn: 'root'})
export class LoginStateService {
    loginState$: Observable<LoginInfoModel | null>;
    private _loginState$: BehaviorSubject<LoginInfoModel | null>;

    constructor(private _localStorageService: LocalStorageService) {
        this._loginState$ = new BehaviorSubject<LoginInfoModel | null>(
            this.getLoginState()
        );
        this.loginState$ = this._loginState$.asObservable();
    }

    setLoginState(loginState: LoginInfoModel) {
        this._localStorageService.set(
            CONST.LOCAL_STORAGE_KEYS.LOGIN_INFO,
            loginState
        );
        this._loginState$.next(loginState);
    }

    getLoginState(): LoginInfoModel | null {
        return this._localStorageService.get(CONST.LOCAL_STORAGE_KEYS.LOGIN_INFO);
    }

    removeLoginState() {
        this._localStorageService.remove(CONST.LOCAL_STORAGE_KEYS.LOGIN_INFO);
        return this._loginState$.next(this.getLoginState());
    }
}
