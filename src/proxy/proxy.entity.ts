import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProxyType } from './proxy-type.enum';

@Entity()
export class Proxy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  proxy: string;
  
  @Column({
    type: 'enum',
    enum: ProxyType,
    default: ProxyType.RESIDENTIAL,
  })
  type: ProxyType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
