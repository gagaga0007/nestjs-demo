import { Test } from 'src/modules/test/entities/test.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Test3 {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  orderDate: Date;

  @Column()
  orderMoney: number;

  // 在 test1 中导入的一对多关系
  @ManyToOne(() => Test, (test) => test.test3)
  test: Test;
}
