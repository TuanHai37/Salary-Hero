import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './companies.entity';
import { Requests } from './requests.entity';
import { Role } from 'src/common/enums/role.enum';
import { IsEmail } from 'class-validator';
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    length: 150,
  })
  name: string;

  @Column()
  company_id: number;

  @ManyToOne(() => Company, (company) => company.user)
  @JoinColumn({
    name: 'company_id',
  })
  company: Company;

  @OneToMany(() => Requests, (request) => request.user)
  requests?: Requests[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Employee,
  })
  role: Role;

  @Column({
    length: 50,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @Generated('uuid')
  code: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  salary: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
