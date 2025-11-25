import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProxyMaks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  proxy: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
