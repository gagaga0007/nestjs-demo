import { TestProviderName } from '../../model/test';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { Test } from './entities/test.entity';

const TestORMModule = TypeOrmModule.forFeature([Test]);

@Module({
  imports: [TestORMModule],
  controllers: [TestController],
  providers: [
    // 自定义，在 controller 中引入 @Inject 装饰器使用
    // 自定义名称
    {
      provide: TestProviderName.TEST,
      useClass: TestService,
    },
    // 自定义值
    {
      provide: TestProviderName.TEST_VALUE,
      useValue: ['test1Value', 'test2Value', 'test3Value'],
    },
    // 自定义工厂
    {
      provide: TestProviderName.TEST_FACTORY,
      useFactory() {
        console.log('===== useFactory init =====');
        return '===== inject useFactory =====';
      },
    },
  ],
  // 直接使用 service 可以简写 providers：（test.controller.ts 的 constructor 需要删除 @Inject('test')）
  // providers: [TestService],
})
export class TestModule {}
