import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

// 管道
// 1. 是一个类
// 2. 实现PipeTransform接口
// 3. 被@Injectable()装饰器修饰

@Injectable()
export class ValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    // 当验证类型不是 JavaScript 的数据类型时，跳过验证。
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // 转换 JavaScript 的参数为可验证的类型对象
    const object = plainToClass(metatype, value);
    // 一个请求中的 body 数据是不包含类型信息的，
    // Class-validator 需要使用前面定义过的 DTO，就需要做一个类型转换
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation Failed');
    }
    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types: Type<any>[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
