import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Book {
  constructor(args?: Partial<Book>) {
    Object.assign(this, args);
  }
  @Field((type) => Int!)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 128, nullable: false })
  title: string;

  @Field()
  @Column({ type: 'text', nullable: false })
  description: string;

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  updatedOn: Date;
}
