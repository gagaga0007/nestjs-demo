import { Test3 } from 'src/modules/test3/entities/test3.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

/**
 * 定义实体
 */
@Entity()
export class Test {
  // 自增，不重复
  @PrimaryGeneratedColumn()
  id: number;

  // {} 定义类型
  @Column({ type: 'varchar', length: 128 })
  name: string;

  // 自动生成时间
  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  // // 自动生成
  // @Generated('uuid')
  // uuid: string;

  // 一对多关系，从 test3 的实体中引入
  @OneToMany(() => Test3, (test3) => test3.orderId)
  @JoinColumn()
  test3: Test3[];
}
