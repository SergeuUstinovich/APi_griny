import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Requests } from '../requests/requests.entity';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  comment: string;

  @Column()
  domain: string;

  @Column()
  link: string;

  @OneToMany(() => Requests, (request) => request.project)
  requests: Requests[];
}
