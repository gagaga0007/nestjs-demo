import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { ParamsProps } from 'src/model/common';
import { Test } from './entities/test.entity';
import { TestService } from './test.service';

/**
 * @Body 为简写 / 完整 @Request req; / 调用 req.body;
 * @Param 为简写 / 完整 @Request req; / 调用 req.params.id; / 获取路径上传的值
 * @Query 为简写 / 完整 @Request req; / 调用 req.query.id; / 获取 ? 拼接传的值
 * 动态路由，后面可以跟多个，以冒号拼接 /xxx/:id/:name
 * 查看请求头 @Header
 */
@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

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
}
