import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Domains } from './domains.entity';

@Entity('chains')
export class Chains {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  chain_id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  main_domain!: string;

  @Column({ nullable: true })
  last_domain!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Domains, domain => domain.chain)
  domains!: Domains[];
}