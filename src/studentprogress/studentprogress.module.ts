import { Module } from '@nestjs/common';
import { StudentprogressService } from './studentprogress.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutoringSessionEntity } from 'src/tutoringsession/entity/tutoringsession.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { TutoringsessionModule } from 'src/tutoringsession/tutoringsession.module';
import { StudentprogressController } from './studentprogress.controller';
import { StudentProgressEntity } from './entity/studentProgress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TutoringSessionEntity,
      UserEntity,
      StudentProgressEntity,
    ]),
    TutoringsessionModule,
  ],
  providers: [StudentprogressService],
  controllers: [StudentprogressController],
})
export class StudentprogressModule {}
