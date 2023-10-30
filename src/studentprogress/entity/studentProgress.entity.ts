import { TutoringSessionEntity } from '../../tutoringsession/entity/tutoringsession.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../helpers/db-helper';

@Entity()
export class StudentProgressEntity extends BaseEntity {
  @Column()
  grade: number;

  @Column()
  performanceMetrics: string;

  @Column()
  feedback: string;

  @ManyToOne(
    () => TutoringSessionEntity,
    (student) => student.studentProgress,
    {
      onDelete: 'CASCADE',
    },
  )
  tutoringSession: TutoringSessionEntity;
}
