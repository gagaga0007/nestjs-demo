import { GlobalModule } from './modules/global/global.module';
import { Test2Module } from './modules/test2/test2.module';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMConfig } from './core/config';
import { TestModule } from './modules/test/test.module';
import { Test3Module } from './modules/test3/test3.module';

const ORMModule: DynamicModule = TypeOrmModule.forRoot(ORMConfig);

@Module({
  imports: [
    ORMModule,
    GlobalModule.forRoot('test option'), // 动态模块。静态模块直接写 GlobalModule 即可
    TestModule,
    Test2Module,
    Test3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
