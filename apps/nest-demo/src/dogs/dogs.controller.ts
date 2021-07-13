import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  @Get('test')
  test(): void {
    this.dogsService.test();
  }

  @Get('receiveMsg')
  receiveMsg(): void{
    this.dogsService.receiveMsg();
  }
}
