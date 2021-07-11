import { ObjectSchema } from '@hapi/joi';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    // 验证
    const error = this.schema.validate(value);

    // 验证管道 要么返回该值，要么抛出一个错误。
    if (error) {
      throw new BadRequestException('validation failed');
    }
    return value;
  }
}
