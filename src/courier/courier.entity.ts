import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Courier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  request: string;
}
