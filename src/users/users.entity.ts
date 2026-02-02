import { Company } from 'src/companies/company.entity';
import { Role } from 'src/roles/roles.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Company, (company) => company.users, {
    onDelete: 'CASCADE',
  })
  @ManyToMany(() => Role, (role) => role.users, {
    cascade: true,
  })
  @JoinTable()
  roles:  Role[]
  company: Company;
}
