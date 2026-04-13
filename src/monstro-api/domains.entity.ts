import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Chains } from './chains.entity';
import { Keywords } from './keywords.entity';

@Entity('domains')
export class Domains {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  chain_id!: number;

  @ManyToOne(() => Chains, (chain) => chain.domains)
  @JoinColumn({ name: 'chain_id', referencedColumnName: 'chain_id' })
  chain!: Chains;

  @Column()
  project_id!: number;

  @OneToMany(() => Keywords, (keyword) => keyword.domain)
  keywords!: Keywords[];

  @Column({ type: 'varchar' })
  domain!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  task_type!: string;

  @Column({ type: 'json', nullable: true })
  click_regions: any;

  @Column({ type: 'int', nullable: true })
  power!: number;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ type: 'varchar', nullable: true })
  active_until!: string;

  @Column({ type: 'int', nullable: true })
  order!: number;

  @Column({ type: 'int', nullable: true })
  task_link_id!: number;

  @Column({ type: 'int', nullable: true })
  pws!: number;

  @Column({ type: 'int', nullable: true })
  monthly_clicks!: number;

  @Column({ type: 'json', nullable: true })
  today_stats: any;

  @Column({ type: 'json', nullable: true })
  today_plan: any;

  @CreateDateColumn()
  added_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
