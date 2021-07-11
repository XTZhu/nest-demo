import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if(!roles){
      return true;
    }
    // 在 node.js 世界中，将授权用户附加到 request 对象是一种常见的做法。 
    // 因此，在代码中。我们假设 request.user 包含用户实例和允许的角色。
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // 验证用户身份的函数
    // return matchRoles(roles, user.roles);
    return true;
  }
}
