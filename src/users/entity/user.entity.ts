import { Entity, Column, OneToMany } from 'typeorm';
import { Role } from '../eum/user-role.enum';
import { BaseEntity } from '../../helpers/db-helper';
import { TutoringSessionEntity } from '../../tutoringsession/entity/tutoringsession.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ enum: Role, default: Role.USER, type: 'enum' })
  role: Role;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => TutoringSessionEntity, (session) => session.tutor, {
    cascade: true,
  })
  tutorialSession: TutoringSessionEntity[];
}
