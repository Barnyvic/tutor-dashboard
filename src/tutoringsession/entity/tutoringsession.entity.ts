import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../helpers/db-helper';
import { UserEntity } from '../../users/entity/user.entity';
import { StudentProgressEntity } from 'src/studentprogress/entity/studentProgress.entity';

@Entity()
export class TutoringSessionEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.tutorialSession, {
    onDelete: 'CASCADE',
  })
  tutor: UserEntity;

  @Column()
  studentName: string;

  @Column()
  date: Date;

  @Column()
  subject: string;

  @OneToMany(
    () => StudentProgressEntity,
    (studentProgress) => studentProgress.tutoringSession,
  )
  studentProgress: StudentProgressEntity[];
}
