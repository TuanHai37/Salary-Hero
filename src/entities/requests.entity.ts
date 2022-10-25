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
export class Requests {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.request, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user?: User;

  @Column()
  user_id: number;

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

  @CreateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
