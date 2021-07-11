import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
  constructor() {
    super('fuck This Forbidden', HttpStatus.FORBIDDEN);
  }
}