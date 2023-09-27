import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./services/interceptors/error.interceptor";
import {JwtInterceptor} from "./services/interceptors/jwt.interceptor";

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ]
})
export class CoreModule {
}
