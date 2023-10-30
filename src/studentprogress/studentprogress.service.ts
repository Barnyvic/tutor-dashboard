/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentProgressEntity } from './entity/studentProgress.entity';
import { TutoringSessionEntity } from 'src/tutoringsession/entity/tutoringsession.entity';
import { Return } from 'src/utils/return-function';
import { IReturnObject } from 'src/types/return-object.type';

@Injectable()
export class StudentprogressService {
  constructor(
    @InjectRepository(StudentProgressEntity)
    private studentProgressRepository: Repository<StudentProgressEntity>,
    @InjectRepository(TutoringSessionEntity)
    private tutoringSessionRepository: Repository<TutoringSessionEntity>,
  ) {}

  async createStudentProgress(
    tutoringSessionid: string,
    data: Partial<StudentProgressEntity>,
  ): Promise<IReturnObject> {
    const { id, created_at, updated_at, ...rest } = data;

    const tutorialSession = await this.tutoringSessionRepository.findOne({
      where: { id: tutoringSessionid },
      relations: ['studentProgress'],
    });

    if (!tutorialSession) {
      return Return({
        error: true,
        statusCode: 404,
        errorMessage: 'Session not found',
      });
    }

    const studentProgress = new StudentProgressEntity();
    studentProgress.grade = rest.grade;
    studentProgress.performanceMetrics = rest.performanceMetrics;
    studentProgress.feedback = rest.feedback;
    studentProgress.tutoringSession = tutorialSession;

    const createdStudentProgress = await this.studentProgressRepository.save(
      studentProgress,
    );
    return Return({
      error: false,
      statusCode: 201,
      successMessage: 'created successfully...',
      data: createdStudentProgress,
    });
  }

  async updateStudentProgress(
    studentProgressId: string,
    updatedData: Partial<StudentProgressEntity>,
  ): Promise<IReturnObject> {
    const existingStudentProgress =
      await this.studentProgressRepository.findOne({
        where: { id: studentProgressId },
      });

    if (!existingStudentProgress) {
      return Return({
        error: true,
        statusCode: 404,
        errorMessage: 'Student progress not found',
      });
    }

    const { grade, performanceMetrics, feedback, ...rest } = updatedData;
    existingStudentProgress.grade =
      grade !== undefined ? grade : existingStudentProgress.grade;
    existingStudentProgress.performanceMetrics =
      performanceMetrics !== undefined
        ? performanceMetrics
        : existingStudentProgress.performanceMetrics;
    existingStudentProgress.feedback =
      feedback !== undefined ? feedback : existingStudentProgress.feedback;

    const updatedStudentProgress = await this.studentProgressRepository.save(
      existingStudentProgress,
    );

    return Return({
      error: false,
      statusCode: 200,
      successMessage: 'Student progress updated successfully',
      data: updatedStudentProgress,
    });
  }
}
