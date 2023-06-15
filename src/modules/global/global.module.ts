import { GlobalProviderName } from './dto/global';
import { Global, Module, Provider, DynamicModule } from '@nestjs/common';

/**
 * 全局模块
 * 使用装饰器 @Global
 */
@Global()
@Module({
  // 静态模块写法
  // providers: [globalProvider],
  // // 导出，在 app.module.ts 的 imports 中引入
  // exports: [globalProvider],
})
export class GlobalModule {
  // 配置动态模块
  static forRoot(option: string): DynamicModule {
    const globalProvider: Provider = {
      provide: GlobalProviderName.GLOBAL,
      useValue: { globalValue: 'global-module-value ===== ' + option },
    };

    return {
      module: GlobalModule,
      providers: [globalProvider],
      // 导出，在 app.module.ts 的 imports 中引入
      exports: [globalProvider],
    };
  }
}
