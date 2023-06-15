import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { ApiResultProps, DataResultProps } from '../../model/common';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  successMsg: string;
  successCode: number;
  errorMsg: string;
  errorCode: number;

  constructor(@InjectRepository(Test) private readonly test: Repository<Test>) {
    this.successMsg = 'success!';
    this.successCode = 200;
    this.errorMsg = 'error! ';
    this.errorCode = 400;
  }

  addTest(newData: Test): ApiResultProps {
    if (Object.getOwnPropertyNames(newData).length === 0) {
      return {
        code: this.errorCode,
        msg: this.errorMsg + '=== input empty ===',
      };
    }

    const newTest = new Test();
    newTest.name = newData.name;
    this.test.save(newTest);

    return {
      code: this.successCode,
      msg: this.successMsg,
    };
  }

  deleteTest(id: string): ApiResultProps {
    if (!id) {
      return {
        code: this.errorCode,
        msg: this.errorCode + '=== id empty ===',
      };
    }

    const deleteId = parseInt(id);
    this.test.delete(deleteId);

    return {
      code: this.successCode,
      msg: this.successMsg,
    };
  }

  updateTest(id: string, updateData: Test): ApiResultProps {
    if (!id) {
      return {
        code: this.errorCode,
        msg: this.errorCode + '=== id empty ===',
      };
    }
    if (Object.getOwnPropertyNames(updateData).length === 0) {
      return {
        code: this.errorCode,
        msg: this.errorCode + '=== data empty ===',
      };
    }

    const updateId = parseInt(id);
    const updateTest = new Test();
    updateTest.name = updateData.name;
    this.test.update(updateId, updateTest);

    return {
      code: this.successCode,
      msg: this.successMsg,
    };
  }

  async getTests(search?: Partial<Test>): Promise<DataResultProps<Test>> {
    let searchObj: FindManyOptions<Test>;

    if (search && Object.getOwnPropertyNames(search).length !== 0) {
      searchObj = {
        where: {
          name: Like(`%${search.name ?? ''}%`),
        },
      };
    }

    const data = await this.test.find(searchObj);

    return {
      code: this.successCode,
      msg: this.successMsg,
      data,
    };
  }

  async getTestById(
    id: string,
  ): Promise<DataResultProps<Test> | ApiResultProps> {
    if (!id) {
      return {
        code: this.errorCode,
        msg: this.errorCode + '=== id empty ===',
      };
    }

    const data = await this.test.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!data) {
      return {
        code: this.errorCode,
        msg: this.errorMsg + '=== not found ===',
      };
    }

    return {
      code: this.successCode,
      msg: this.successMsg,
      data,
    };
  }
}
