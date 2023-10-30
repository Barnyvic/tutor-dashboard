import { Body, Controller, Req, Res, Param, Post, Put } from '@nestjs/common';
import { StudentprogressService } from './studentprogress.service';
import { Response } from 'express';
import { StudentProgressDto } from './dto/student-progress.dto';

@Controller('studentprogress')
export class StudentprogressController {
  constructor(
    private readonly studentprogressService: StudentprogressService,
  ) {}

  @Post(':tutoringSessionId')
  async createStudentProgress(
    @Param('tutoringSessionId') tutoringSessionId: string,
    @Body() data: StudentProgressDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const result = await this.studentprogressService.createStudentProgress(
      tutoringSessionId,
      data,
    );
    res.status(result.statusCode).send(result);
  }

  @Put(':studentProgressId')
  async updateStudentProgress(
    @Param('studentProgressId') studentProgressId: string,
    @Body() updatedData: StudentProgressDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const result = await this.studentprogressService.updateStudentProgress(
      studentProgressId,
      updatedData,
    );
    res.status(result.statusCode).send(result);
  }
}
