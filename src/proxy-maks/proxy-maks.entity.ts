import { ProxyType } from 'src/proxy/proxy-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProxyMaks {
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
