import { GlobalProviderName } from './../global/dto/global';
import { Test2Service } from './../test2/test2.service';
import { ModuleName } from '../../core/common';
import { TestProviderName } from './dto/test';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Delete,
  Put,
  Inject,
} from '@nestjs/common';
import { ParamsProps } from 'src/core/common';
import { Test } from './entities/test.entity';
import { TestService } from './test.service';

/**
 * @Body 为简写 / 完整 @Request req; / 调用 req.body;
 * @Param 为简写 / 完整 @Request req; / 调用 req.params.id; / 获取路径上传的值
 * @Query 为简写 / 完整 @Request req; / 调用 req.query.id; / 获取 ? 拼接传的值
 * 动态路由，后面可以跟多个，以冒号拼接 /xxx/:id/:name
 * 查看请求头 @Header
 * 使用 module 的自定义值等，使用 @Inject 引入
 */
@Controller(ModuleName.TEST)
export class TestController {
  // test.module.ts 中 providers 直接使用 service 简写时，删除 @Inject('xxx')
  constructor(
    // 注入自定义 providers
    @Inject(TestProviderName.TEST) private testService: TestService,
    @Inject(TestProviderName.TEST_VALUE) private testValue: string[], // module 传入的自定义值
    @Inject(TestProviderName.TEST_FACTORY) private testFactory: string, // module 传入的自定义工厂
    // 注入全局引入的模块
    @Inject(GlobalProviderName.GLOBAL) private global: { [key: string]: any },
    // 其他模块的内容
    private test2Service: Test2Service,
  ) {}

  @Post('/add')
  addTest(@Body() body: Test) {
    return this.testService.addTest(body);
  }

  @Delete('/delete/:id')
  deleteTest(@Param() params: ParamsProps) {
    return this.testService.deleteTest(params.id);
  }

  @Put('/update/:id')
  updateTest(@Param() params: ParamsProps, @Body() body: Test) {
    return this.testService.updateTest(params.id, body);
  }

  @Get('/list')
  getTests(@Query() query: Partial<Test>) {
    return this.testService.getTests(query);
  }

  @Get('/by/:id')
  getTest(@Param() params: ParamsProps) {
    return this.testService.getTestById(params.id);
  }

  @Get('/value/test')
  getTestValue() {
    return {
      // 使用注入的自定义值
      injectValue: this.testValue,
    };
  }

  @Get('/factory/test')
  getTestFactory() {
    // 使用注入的自定义工厂函数
    const msg = this.testFactory;

    return {
      injectFactoryReturnMsg: msg,
    };
  }

  @Get('/test2/findAll')
  getTest2Service() {
    // 使用其他模块的 service
    return this.test2Service.findAll();
  }

  @Get('/global')
  getGlobal() {
    // 使用全局引入的模块
    return this.global;
  }
}
