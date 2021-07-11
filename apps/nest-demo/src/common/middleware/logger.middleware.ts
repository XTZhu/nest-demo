import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    // console.log('Requesting...');
    Logger.log('Requesting...');
    next();
  }
}

export function logger(req: Request, res: Response, next: NextFunction): void {
  console.log('function Requesting...');
  next();
}
