import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  create(@Body() createDogDto: CreateDogDto): string {
    return this.dogsService.create(createDogDto);
  }

  @Get('getMsg')
  getMsg(@Query('msg') msg: string): void {
    this.dogsService.getMsg(msg);
  }

  @Get('receiveMsg')
  receiveMsg(): void {
    this.dogsService.receiveMsg();
  }
}
