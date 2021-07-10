import { Param, Put, Query, Redirect } from "@nestjs/common";
import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { CatsService } from "./cats.service";
import { CreateCatDto, UpdateCatDto } from "./dto/creat-cat.dto";
import { Cat } from "./interfaces/cat.interface";


@Controller('cats')
export class CatsController {
	constructor(private readonly catsService: CatsService) { }

	@Get()
	findAll(): Cat[] {
		return this.catsService.findAll();
	}

	@Post()
	create(@Body() createCatDto: CreateCatDto): void {
		this.catsService.create(createCatDto);
	}


	@Get('all_cat')
	findAllRxjs(): Observable<any[]> {
		return of(['a']);
	}

	@Get('all_cat')
	async findAllAsync(): Promise<any[]> {
		return [];
	}

	// @Get('all_cat')
	// findAll(): string {
	// 	return `thats all cats!`;
	// }

	@Get('find*color')
	findCatByColor(@Query('color') color: string): string {
		return `thats is a ${color} cats!`;
	}

	@Get('black')
	findBlackCat(): string {
		return 'yes! you find a blcak cat called mid-night';
	}

	// @Post()
	// @HttpCode(201)
	// @Header('Cache-Control', 'navicat')
	// create(@Body() createCatDto: CreateCatDto): string {
	// 	// use x-www-form-urlencoded / raw get right data
	// 	const { age, name, breed } = createCatDto;
	// 	return `This action adds a new cat. it's a ${age} years old ${breed} cat, and it's name is ${name}. `;
	// }

	@Get('docs')
	@Redirect('https:/docs.nestjs.com', 302)
	getDocs(@Query('version') version: number): any {
		// 重定向
		// return的这个对象将返回给@Redict装饰器, 这个对象将作为@Redict的参数
		// 比如 @Redirect(`https://docs.nestjs.com/v${version}/`， 302)
		return {
			url: `https://docs.nestjs.com/v${version}/`,
			statusCode: 302,
		};
	}

	// 如果两个HTTP请求装饰器完全相同 那么只会执行(从上往下顺序)靠前的那个函数

	@Get(':id')
	findOneShort(@Param('id') id: string): string {
		console.log('function findOneShort');
		console.log(typeof id);
		return `This action returns a #${id} cat.`;
	}

	@Get(':id')
	findOne(@Param() params: { id: string }): string {
		console.log(params);
		console.log(params.id);
		console.log(typeof params.id);
		console.log('function findOne');
		return `This action returns a #${params.id} cat.`;
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
		console.log(updateCatDto);
		return `This action updates a #${id} cat`;
	}

	@Delete(':id')
	remove(@Param('id') id: string): string {
		return `This action removes a #${id} cat`;
	}

}