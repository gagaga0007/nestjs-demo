import { Module } from '@nestjs/common';
import { Test2Service } from './test2.service';
import { Test2Controller } from './test2.controller';

@Module({
  controllers: [Test2Controller],
  providers: [Test2Service],
  // 如果想要本模块以外的模块使用本模块的 service，需要使用 exports 导出
  exports: [Test2Service],
})
export class Test2Module {}
