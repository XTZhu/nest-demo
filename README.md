<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Client

```bash

# query in browser / postman
localhost:3000?name=xx

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# 项目简介

## how to setup?

read this [article(https://dev.to/lampewebdev/monorepo-and-microservice-setup-in-nest-js-41n4)](https://dev.to/lampewebdev/monorepo-and-microservice-setup-in-nest-js-41n4)

## bug

rabbit 镜像不断重启

https://github.com/docker-library/rabbitmq/issues/171

## 出现的库的地址

- [class-validator](https://github.com/typestack/class-validator#usage)

## 梳理生命周期

Nest 应用程序处理请求并生成回应的过程被称为请求生命周期。  
使用中间件、管道、守卫和拦截器时，要在请求生命周期中追踪特定的代码片段的执行很困难，尤其是在全局、控制器或者路由的部件中。  
**一般来说，一个请求流经*中间件*、*守卫*与*拦截器*，然后到达*管道*，并最终回到拦截器中的返回路径中（从而产生响应）。**

### 中间件

中间件以特殊的顺序执行。  
首先，Nest运行全局绑定的中间件（例如app.use中绑定的中间件），然后运行在路径中指定的模块绑定的中间件。  
中间件以他们绑定的次序顺序执行，这和在Express中的中间件工作原理是类似的。  

### 守卫
守卫的执行首先从全局守卫开始，然后处理控制器守卫，最后是路径守卫。  
和中间件一样，守卫的执行也和他们的绑定顺序一致。例如：  

``` js
@UseGuards(Guard1, Guard2)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @UseGuards(Guard3)
  @Get()
  getCats(): Cats[] {
    return this.catsService.getCats();
  }
}
```

**Guard1**会在**Guard2**之前执行 并且这两者都先于**Guard3**执行

### 拦截器
拦截器在大部分情况下和守卫类似。  
> 只有一种情况例外：当拦截器返回的是一个RxJS Observables时，observables是以**先进后出**的顺序执行的。  

> 因此，入站请求是按照标准的全局、控制器和路由层次执行的，但请求的响应侧（例如，当从一个控制器方法的处理器返回时）则是从路由到控制器再到全局。  

另外，由管道、控制器或者服务抛出的任何错误都可以在拦截器的catchError操作者中被读取。

### 管道
管道按照标准的从全局到控制器再到路由的绑定顺序，遵循先进先出的原则按照@usePipes()参数次序顺序执行。  
然而，在*路由参数*层次，如果由多个管道在执行，则会按照**自后向前的参数**顺序执行，  
这在路由层面和控制器层面的管道中同样如此，例如，我们有如下控制器：  

``` js
@UsePipes(GeneralValidationPipe)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @UsePipes(RouteSpecificPipe)
  @Patch(':id')
  updateCat(
    @Body() body: UpdateCatDTO,
    @Param() params: UpdateCatParams,
    @Query() query: UpdateCatQuery,
  ) {
    return this.catsService.updateCat(body, params, query);
  }
}
```

> 在这里**GeneralValidationPipe**会先执行**query**，然后是**params**，最后是**body**对象，接下来在执行RouteSpecificPipe管道时同样按照上述次序执行。

如果存在任何参数层的管道，它会在（同样的，按照自后向前的参数顺序）控制器和路由层的管道之后执行


### 过滤器
过滤器是唯一一个不按照全局第一顺序执行的组件。而是会从最低层次开始处理，也就是说先从任何路由绑定的过滤器开始，然后是控制器层，最后才是全局过滤器。   

注意，异常无法从过滤器传递到另一个过滤器；如果一个路由层过滤器捕捉到一个异常，一个控制器或者全局层面的过滤器就捕捉不到这个异常。如果要实现类似的效果可以在过滤器之间使用继承。

> 过滤器仅在请求过程中任何没有捕获的异常发生时执行。捕获的异常如try/catch语句不会触发过滤器。一旦遇到未处理的异常，请求接下来的生命周期会被忽略并直接跳转到过滤器


### 总结

一般来说，请求生命周期大致如下：

1. 收到请求
2. 全局绑定的中间件
3. 模块绑定的中间件
4. 全局守卫
1. 控制层守卫
1. 路由守卫
1. 全局拦截器（控制器之前）
1. 控制器层拦截器 （控制器之前）
1. 路由拦截器 （控制器之前）
1. 全局管道
1. 控制器管道
1. 路由管道
1. 路由参数管道
1. 控制器（方法处理器） 15。服务（如果有）
1. 路由拦截器（请求之后）
1. 控制器拦截器 （请求之后）
1. 全局拦截器 （请求之后）
1. 异常过滤器 （路由，之后是控制器，之后是全局）
1. 服务器响应