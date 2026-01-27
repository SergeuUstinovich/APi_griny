import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProxyTypeMaks } from './proxy-maks-type.enum';

@Entity()
export class ProxyMaks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  proxy: string;

  @Column({
    type: 'enum',
    enum: ProxyTypeMaks,
    default: ProxyTypeMaks.RESIDENTIAL,
  })
  type: ProxyTypeMaks;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
