import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './companies.entity';
import { Requests } from './requests.entity';
import { Role } from 'src/common/enums/role.enum';

@Entity({
  name: 'requests',
})
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    length: 150,
  })
  name: string;

  @OneToOne(() => Company, (company) => company.company_id)
  @JoinColumn({
    name: 'company_id',
  })
  company_id: Company;

  @OneToMany(() => Requests, (request) => request.user, {
    createForeignKeyConstraints: true,
  })
  request?: Request[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Employee,
  })
  role: Role;

  @PrimaryGeneratedColumn('uuid')
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

  @CreateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
