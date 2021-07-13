import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { DataBaseModule } from '@app/database';

@Module({
  imports: [DataBaseModule],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
