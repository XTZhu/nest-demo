import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// 拦截器在创建用于整个应用程序的可重用解决方案时具有巨大的潜力。
// 例如，我们假设我们需要将每个发生的 null 值转换为空字符串 ''。
// 我们可以使用一行代码并将拦截器绑定为全局代码。
// 由于这一点，它会被每个注册的处理程序自动重用。

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map(value => (value === null ? '' : value)));
  }
}
