import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigOptions, EnvConfig } from '../interfaces';
import { CONFIG_OPTIONS } from './constants';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    console.log(__dirname, '__dirname');
    const envFile = path.resolve('.env');
    console.log(filePath, 'filePaths');
    console.log(options, 'optionss');
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
