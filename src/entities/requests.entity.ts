import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'requests',
})
export class Requests {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  user_id: number;

  @ManyToOne(() => User, (user) => user.requests, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
  })
  user?: User;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 10,
    scale: 2,
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

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
