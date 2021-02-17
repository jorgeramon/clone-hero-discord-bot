import { Controller, Post, Req } from '@nestjs/common';

@Controller('facebook')
export class FacebookController {
  @Post()
  testB(@Req() request) {
    console.log('-----------------[ Facebook POST ]-----------------------');
    console.log(JSON.stringify(request.body, null, 2));
    return 'Ok from GET';
  }
}
