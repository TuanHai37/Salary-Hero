import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './companies.entity';
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

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Employee,
  })
  role: Role;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
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
