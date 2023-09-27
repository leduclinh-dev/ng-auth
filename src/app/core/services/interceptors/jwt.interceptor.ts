import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";
import {LoginStateService} from "../app/login-state.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private _API_URL = environment.api.base;

    constructor(private _loginStateService$: LoginStateService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${
                    this._loginStateService$.getLoginState()
                        ? this._loginStateService$.getLoginState()?.accessToken
                        : ''
                }`,
            },
            url: this._API_URL + request.url,
        });
        return next.handle(request);
    }
}
