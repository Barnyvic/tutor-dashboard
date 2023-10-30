import { Module, forwardRef } from '@nestjs/common';
import { TutoringsessionService } from './tutoringsession.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutoringSessionEntity } from './entity/tutoringsession.entity';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../users/entity/user.entity';
import { UsersModule } from '../users/users.module';
import { TutoringsessionController } from './tutoringsession.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TutoringSessionEntity, UserEntity]),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  providers: [TutoringsessionService],
  controllers: [TutoringsessionController],
  exports: [TutoringsessionService],
})
export class TutoringsessionModule {}
