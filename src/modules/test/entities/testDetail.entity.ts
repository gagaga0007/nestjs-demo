import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class TestDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subName: string;

  @Column()
  description: string;

  // 一对一关系，对应 Test
  @OneToOne(() => Test)
  @JoinColumn()
  // 通过此方式可以自定义列名称
  // @JoinColumn({ name: 'test_id' })
  test: Test;
}
