import { PartialType } from '@nestjs/mapped-types';
import { CreateTest3Dto } from './create-test3.dto';

export class UpdateTest3Dto extends PartialType(CreateTest3Dto) {}
