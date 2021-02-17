import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';

@Controller('facebook')
export class FacebookController {
  @Get()
  testA(@Req() request) {
    console.log('-----------------[ Facebook GET ]-----------------------');
    console.log(request.body);
    console.log(request.query);
    return 'Ok from GET';
  }

  @Post()
  testB(@Req() request) {
    console.log('-----------------[ Facebook POST ]-----------------------');
    console.log(request.body);
    console.log(request.query);
    return 'Ok from GET';
  }

  @Put()
  testC(@Req() request) {
    console.log('-----------------[ Facebook PUT ]-----------------------');
    console.log(request.body);
    console.log(request.query);
    return 'Ok from GET';
  }

  @Delete()
  testD(@Req() request) {
    console.log('-----------------[ Facebook DEL ]-----------------------');
    console.log(request.body);
    console.log(request.query);
    return 'Ok from GET';
  }
}
