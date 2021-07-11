import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

// 管道
// 1. 是一个类
// 2. 实现PipeTransform接口
// 3. 被@Injectable()装饰器修饰

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    return value;
  }
}
