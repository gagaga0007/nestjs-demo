import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nest_test', // 数据库名

  retryDelay: 500, // 重试间隔 毫秒
  retryAttempts: 10, // 重试次数 次

  synchronize: true, // 是否将实体同步到数据库
  autoLoadEntities: true, // 自动加载实体
};
