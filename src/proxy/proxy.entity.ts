import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Proxy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  proxy: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
