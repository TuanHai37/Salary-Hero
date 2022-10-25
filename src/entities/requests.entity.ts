import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'requests',
})
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.user_id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user_id?: User;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  amount: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  status: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
