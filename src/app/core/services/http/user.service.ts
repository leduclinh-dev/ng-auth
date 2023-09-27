import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {UserModel} from "../../models/user.model";
import {HttpClient} from "@angular/common/http";
import * as CONST from '../../constant';
import {UserStateService} from "../app/user-state.service";

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private _http: HttpClient, private _userStateService: UserStateService) {
    }

    getUserInfo(): Observable<UserModel> {
        return this._http.get<UserModel>(CONST.API_URI.GET_PROFILE)
            .pipe(
                map(user => {
                    this._userStateService.setUserState(user)
                    return user
                })
            )
    }
}
