import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LoginInfoModel} from "../../models/login-info.model";
import * as CONST from '../../constant';
import {LoginStateService} from "../app/login-state.service";

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private _http: HttpClient,
                private _loginStateService$: LoginStateService) {
    }

    login(email: string, password: string): Observable<LoginInfoModel> {
        return this._http.post<LoginInfoModel>(CONST.API_URI.LOGIN, {email, password})
            .pipe(
                map(res => {
                    this._loginStateService$.setLoginState(res);
                    return res
                })
            )
    }

    getRefreshToken(): Observable<LoginInfoModel> {
        return this._http.post<LoginInfoModel>(CONST.API_URI.REFRESH_TOKEN,
            {refreshToke: this._loginStateService$.getLoginState()?.refreshToken})
            .pipe(map(res => {
                this._loginStateService$.setLoginState(res);
                return res
            }))
    }
}
