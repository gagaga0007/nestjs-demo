import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 全局中间件
const globalMiddleWare = (req: any, res: any, next: any) => {
  console.log('===== global middleware =====');
  next();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局增加前缀
  // app.setGlobalPrefix('api');

  // 使用全局中间件
  app.use(globalMiddleWare);

  // 配置 webpack 热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}
bootstrap();
