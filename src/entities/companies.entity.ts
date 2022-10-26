import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @OneToMany(() => User, (user) => user.company)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
