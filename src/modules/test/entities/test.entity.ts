import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * 定义实体
 *
 * Object <-> Mapping <-> DB
 * ORM 自动完成映射，所以只需要定义实体类即可操作数据库。
 * Object 即实体，即可自动生成表结构，DB 中的数据也会编程为标准对象。
 * 
 * 类型：
 * int, tinyint, smallint, mediumint, bigint, float, double, dec, decimal, 
    numeric, date, datetime, timestamp, time, year, char, varchar, nvarchar,
    text, tinytext, mediumtext, blob, longtext, tinyblob, mediumblob, longblob, 
    enum, json, binary, geometry, point, linestring, polygon, multipoint,
    multilinestring, multipolygon, geometrycollection
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
