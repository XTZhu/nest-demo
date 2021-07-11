import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';


// 这是一个 CacheInterceptor，带有硬编码的 isCached 变量和硬编码的响应 [] 。
// 我们在这里通过 of 运算符创建并返回了一个新的流, 因此路由处理程序根本不会被调用。
// 当有人调用使用 CacheInterceptor 的端点时, 响应 (一个硬编码的空数组) 将立即返回。
// 为了创建一个通用解决方案, 您可以利用 Reflector 并创建自定义修饰符。
// 反射器 Reflector 在守卫章节描述的很好。

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}
