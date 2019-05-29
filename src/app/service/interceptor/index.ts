import {
    HttpEvent, HttpInterceptor, HttpHandler,
    HttpRequest, HTTP_INTERCEPTORS, HttpResponse
} from '@angular/common/http';
import { LogInterceptor } from './logInterceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
];
