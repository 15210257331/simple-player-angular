import { finalize, tap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { of } from 'rxjs';

@Injectable()
export class LogInterceptor implements HttpInterceptor {
  constructor(
    private message: NzMessageService,
    private notification: NzNotificationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const started = Date.now();
    let ok: string;

    return next.handle(req)
      .pipe(
        tap(
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          error => ok = 'failed'
        ),
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          console.log(msg);
        }),
        catchError(res => { // 当请求不是200的时候触发
          if (res.status === 301) {
            if(req.url.indexOf('login/status') === -1) {
              this.message.info('请先登录！');
            }
          } else if(res.status === 400) {
            this.notification.create('error',res.error.msg,'请先选择要喜欢的歌曲！');
          } else {
            this.notification.create('error','请求错误',res.error.msg);
          }
          return of(res);
        })
      );
  }
}
