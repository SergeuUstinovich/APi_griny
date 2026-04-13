import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Domains } from './domains.entity';

@Entity('keywords')
export class Keywords {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  keyword_id!: number;

  @Column()
  project_id!: number;

  @ManyToOne(() => Domains, (domain) => domain.keywords)
  @JoinColumn({ name: 'domain_id' })
  domain!: Domains;

  @Column()
  domain_id!: number;

  @Column()
  kw!: string;

  @Column({ type: 'varchar', nullable: true })
  target_page!: string;

  @Column({ type: 'int', nullable: true })
  last_position!: number;

  @Column({ type: 'int', nullable: true })
  pws!: number;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ type: 'int', nullable: true })
  monthly_clicks!: number;

  @Column({ type: 'int', nullable: true })
  fixed_clicks!: number | null;

  @Column({ type: 'int', nullable: true })
  lr!: number;

  @Column({ type: 'int', nullable: true })
  notfound_count!: number;

  @Column({ type: 'int', nullable: true })
  auto_boost_amount!: number;

  @Column({ type: 'int', nullable: true })
  auto_boost_period!: number | null;

  @Column({ type: 'int', nullable: true })
  scheduled_clicks!: number;

  @Column({ type: 'int', nullable: true })
  boosted_clicks!: number;

  @Column({ type: 'boolean', nullable: true })
  can_set_task_count!: boolean;

  @Column({ type: 'json', nullable: true })
  today_stats: any;

  @CreateDateColumn()
  added_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}