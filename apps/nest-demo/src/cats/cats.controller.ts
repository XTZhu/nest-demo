import { HttpException, HttpStatus, Param, Put, Query, Redirect, UseFilters } from "@nestjs/common";
import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { ForbiddenException } from "../forbidden.exception";
import { HttpExceptionFilter } from "../http-exception.filter";
import { CatsService } from "./cats.service";
import { CreateCatDto, UpdateCatDto } from "./dto/creat-cat.dto";
import { Cat } from "./interfaces/cat.interface";


@Controller('cats')
// bad
// @UseFilters(HttpExceptionFilter)
// good
@UseFilters(new HttpExceptionFilter())
export class CatsController {
	constructor(private readonly catsService: CatsService) { }

	@Get()
	// @UseFilters(HttpExceptionFilter)
	findAll(): Cat[] {
		// 正常响应
		// return this.catsService.findAll();

		// 简短的硬编码
		// throw new HttpException(
		// 	'This is a custom message', HttpStatus.FORBIDDEN);

		// 自定义异常抛出
		throw new ForbiddenException();

		// 覆盖所有参数
		// throw new HttpException({
		// 	status: HttpStatus.FORBIDDEN,
		// 	error: 'This is a custom message',
		// }, HttpStatus.FORBIDDEN);
	}

	// 我们要确保create方法能正确执行，所以必须验证 CreateCatDto 里的三个属性。
	// 我们可以在*路由处理程序方法*中做到这一点，但是我们会打破单个责任原则（SRP）。
	// 另一种方法是创建一个*验证器类*并在那里委托任务，但是不得不每次在方法开始的时候
	// 我们都必须使用这个验证器。那么*验证中间件*呢？ 这可能是一个好主意，但我们不可能创建
	// 一个整个应用程序通用的中间件
	// (因为中间件不知道 execution context执行环境,也不知道要调用的函数和它的参数)。
 

	// 在这种情况下，你应该考虑使用管道。

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