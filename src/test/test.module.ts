import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { Test } from './entities/test.entity';

const TestORMModule = TypeOrmModule.forFeature([Test]);

@Module({
  imports: [TestORMModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
