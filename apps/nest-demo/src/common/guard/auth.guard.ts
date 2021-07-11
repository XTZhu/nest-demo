// guard
// 1. 是一个类
// 2. 被@Injectable()修饰
// 3. 实现 CanActivate接口
// 4. 实现canActivate()方法

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class name implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // 验证请求权限
    // return validateRequest(request);
    // 返回*true* 处理用户调用
    return true;
    // 返回*false* 忽略当前请求
  }
}
