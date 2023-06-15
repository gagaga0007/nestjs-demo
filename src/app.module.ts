import { GlobalModule } from './modules/global/global.module';
import { Test2Module } from './modules/test2/test2.module';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMConfig } from './core/config';
import { TestModule } from './modules/test/test.module';

const ORMModule: DynamicModule = TypeOrmModule.forRoot(ORMConfig);

@Module({
  imports: [
    ORMModule,
    TestModule,
    Test2Module,
    // 动态模块。静态模块直接写 GlobalModule 即可
    GlobalModule.forRoot('test option'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
