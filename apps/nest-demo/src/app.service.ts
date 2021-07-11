import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('Cat_Demo')
    private readonly serviceclient: ClientProxy,
  ) {}

  getHello(name: string): Promise<string> {
    const pattern = { cmd: 'getHello' };
    const payload = name;
    return lastValueFrom(
      this.serviceclient.send<string>(pattern, payload),
    );
  }

  getAllUser(): Promise<string> {
    return lastValueFrom(this.serviceclient.send<string>('findAllUsers', ''));
  }
}
