import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMConfig } from './core/config';
import { TestModule } from './modules/test/test.module';

const ORMModule: DynamicModule = TypeOrmModule.forRoot(ORMConfig);

@Module({
  imports: [ORMModule, TestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
