import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CounterMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('===== counter middleware =====');

    // 做一些拦截操作，返回自定义内容，不继续执行之后的代码
    // res.send('===== 拦截 =====');
    // 然后删除 next()

    next();
  }
}
