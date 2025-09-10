import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Projects } from '../projects/projects.entity';

@Entity()
export class Requests {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar'})
  request: string;

  @Column({ type: 'int' })
  frequency: number;

  @Column()
  region: string;

  @ManyToOne(() => Projects, (project) => project.requests)
  project: Projects;
}
