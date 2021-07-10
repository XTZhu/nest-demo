import { Controller, Get } from "@nestjs/common";


@Controller('cats')
export class CatsController {

	@Get()
	findAll(): string {
		return `thats all cats!`;
	}

	@Get('black')
	findBlackCat(): string {
		return 'yes! you find a blcak cat called mid-night';
	}

}