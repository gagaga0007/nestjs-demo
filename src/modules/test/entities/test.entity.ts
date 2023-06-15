import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
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
}
