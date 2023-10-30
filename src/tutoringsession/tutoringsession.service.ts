/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TutoringSessionEntity } from './entity/tutoringsession.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';
import { Return } from '../utils/return-function';
import { IReturnObject } from '../types/return-object.type';
import { StudentProgressEntity } from 'src/studentprogress/entity/studentProgress.entity';

@Injectable()
export class TutoringsessionService {
  constructor(
    @InjectRepository(TutoringSessionEntity)
    private tutoringSessionRepository: Repository<TutoringSessionEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async addTutoringSession(
    data: Partial<TutoringSessionEntity>,
  ): Promise<IReturnObject> {
    try {
      const { id, created_at, updated_at, ...rests } = data;

      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: ['tutorialSession'],
      });
      if (!user) {
        return Return({
          error: true,
          statusCode: 404,
          errorMessage: 'User not found',
        });
      }

      const createSession = this.tutoringSessionRepository.create({
        ...rests,
        tutor: user,
      });

      const createdSession = await this.tutoringSessionRepository.save(
        createSession,
      );
      return Return({
        error: false,
        statusCode: 201,
        successMessage: 'created successfully...',
        data: createdSession,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: error?.status || error?.statusCode || 500,
        errorMessage:
          error?.message || error?.errorMessage || `Internal Server Error`,
        trace: error,
      });
    }
  }

  async findAllSessionByTutor(tutorId: string): Promise<IReturnObject> {
    try {
      const session = await this.tutoringSessionRepository.find({
        where: { tutor: { id: tutorId } },
      });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Retrieved tutoring sessions  successfully...',
        data: session,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: error?.status || error?.statusCode || 500,
        errorMessage:
          error?.message || error?.errorMessage || `Internal Server Error`,
        trace: error,
      });
    }
  }

  async findSingleSessionByTutor(
    tutorId: string,
    sessionId: string,
  ): Promise<IReturnObject> {
    try {
      const session = await this.tutoringSessionRepository.findOne({
        where: { id: sessionId, tutor: { id: tutorId } },
      });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Retrieved tutoring session  successfully...',
        data: session,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: error?.status || error?.statusCode || 500,
        errorMessage:
          error?.message || error?.errorMessage || `Internal Server Error`,
        trace: error,
      });
    }
  }

  async updateSession(
    data: Partial<TutoringSessionEntity>,
    id: string,
    userId: string,
  ): Promise<IReturnObject> {
    try {
      const { created_at, updated_at, ...rest } = data;

      if (!id) {
        return Return({
          error: true,
          statusCode: 404,
          errorMessage: 'Id must be included',
        });
      }

      const session = await this.tutoringSessionRepository.findOne({
        where: { id },
        relations: ['tutor'],
      });

      if (!session) {
        return Return({
          error: true,
          statusCode: 404,
          errorMessage: 'Post not found',
        });
      }

      if (!session.tutor || session.tutor.id !== userId) {
        return Return({
          error: true,
          statusCode: 401,
          errorMessage: 'Unauthorized to update this session.',
        });
      }

      const updatedSession = await this.tutoringSessionRepository.update(
        { id },
        rest,
      );
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'updated successfully...',
        data: updatedSession.raw[0],
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: error?.status || error?.statusCode || 500,
        errorMessage:
          error?.message || error?.errorMessage || `Internal Server Error`,
        trace: error,
      });
    }
  }

  async getTutoringSessionWithStudentProgressById(
    tutoringSessionId: string,
  ): Promise<StudentProgressEntity[] | undefined> {
    const studentProgress = await this.tutoringSessionRepository.findOne({
      where: { id: tutoringSessionId },
      relations: ['studentProgress'],
    });
    if (!studentProgress) {
      throw new NotFoundException('Tutoring session not found');
    }
    return studentProgress.studentProgress;
  }
}
