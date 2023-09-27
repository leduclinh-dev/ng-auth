import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {AuthService} from "../http/auth.service";
import {UserStateService} from "../app/user-state.service";
import {LoginStateService} from "../app/login-state.service";
import * as CONST from '../../constant';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private _isRefreshingToken = false;

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _loginStateService$: LoginStateService,
        private _userStateService$: UserStateService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError(err => {
                switch (err.status) {
                    case CONST.HttpStatus.UNAUTHORIZED:
                        if (this._loginStateService$.getLoginState() && !this._isRefreshingToken) {
                            this._isRefreshingToken = true;
                            return this.handleRefreshToken(request, next);
                        }
                        break;
                    case CONST.HttpStatus.INTERNAL_SERVER_ERROR:
                    case CONST.HttpStatus.REQUEST_TIMEOUT:
                    case CONST.HttpStatus.METHOD_NOT_ALLOWED:
                    case CONST.HttpStatus.SERVICE_UNAVAILABLE: {
                        this._router.navigate([CONST.FrontURI.SYSTEM_ERROR]);
                        break;
                    }
                }
                return throwError(err);
            })
        )
    }

    handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
        return this._authService.getRefreshToken().pipe(
            switchMap(() => {
                this._isRefreshingToken = false;
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this._loginStateService$.getLoginState()
                            ?.accessToken}`,
                    },
                });
                return next.handle(request);
            }),
            catchError((err) => {
                this._loginStateService$.removeLoginState();
                this._userStateService$.removeUserState();
                this._router.navigate(['/auth']);
                return throwError(err);
            })
        );
    }
}
