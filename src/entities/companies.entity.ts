import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'companies',
})
export class Company {
  @PrimaryGeneratedColumn()
  company_id: number;

  @Column({
    length: 150,
  })
  name: string;

  @OneToOne(() => User, (user) => user.user_id)
  @JoinColumn({
    name: 'user_id',
  })
  admin_id: User;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  code: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
