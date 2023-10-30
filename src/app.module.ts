import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { AuthModule } from './auth/auth.module';
import { TutoringsessionModule } from './tutoringsession/tutoringsession.module';
import { StudentprogressModule } from './studentprogress/studentprogress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    TutoringsessionModule,
    StudentprogressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
