import { Test2Service } from './../test2/test2.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleName } from '../../core/common';
import { CounterMiddleware } from '../../middleware/counter/counter.middleware';
import { Test } from './entities/test.entity';
import { TestProviderName } from './dto/test';
import { TestController } from './test.controller';
import { TestService } from './test.service';

const TestORMModule = TypeOrmModule.forFeature([Test]);

@Module({
  imports: [TestORMModule],
  controllers: [TestController],
  providers: [
    // 其他模块的 service，需要在此模块的 module 中导出，此处简写
    Test2Service,
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

// 使用中间件 CounterMiddleware
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CounterMiddleware).forRoutes(ModuleName.TEST);

    // 仅对某一请求类型生效
    // consumer
    // .apply(CounterMiddleware)
    // .forRoutes({ path: ModuleName.TEST, method: RequestMethod.GET });
  }
}
