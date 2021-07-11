// Intercept
// 1. 是一个类
// 2. 实现NestInterceptor接口
// 3. 实现intercept方法
// 4. 被@Injectable()修饰

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(tap(() => console.log(`After... ${Date.now() - now} ms`)));
  }
}
