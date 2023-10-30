import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TutoringsessionService } from './tutoringsession.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/guards/role-decorator';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { Role } from 'src/users/eum/user-role.enum';
import { Response } from 'express';
import { TutoringSessionDto } from './dto/tutoring-session.dto';

@Controller('tutoringsession')
export class TutoringsessionController {
  constructor(
    private readonly tutoringsessionService: TutoringsessionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.TUTOR)
  async addTutoringSession(
    @Body() data: TutoringSessionDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const id = req['user'];
    const result = await this.tutoringsessionService.addTutoringSession({
      id,
      ...data,
    });
    res.status(result.statusCode).send(result);
  }

  @Get('tutor/:tutorId')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.TUTOR)
  async findAllSessionByTutor(
    @Param('tutorId') tutorId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.tutoringsessionService.findAllSessionByTutor(
      tutorId,
    );
    res.status(result.statusCode).send(result);
  }

  @Get('tutor/:tutorId/:sessionId')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.TUTOR)
  async findSingleSessionByTutor(
    @Param('tutorId') tutorId: string,
    @Param('sessionId') sessionId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.tutoringsessionService.findSingleSessionByTutor(
      tutorId,
      sessionId,
    );
    res.status(result.statusCode).send(result);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.TUTOR)
  async updateSession(
    @Param('id') id: string,
    @Body() data: TutoringSessionDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userId = req['user'];
    const result = await this.tutoringsessionService.updateSession(
      data,
      id,
      userId,
    );
    res.status(result.statusCode).send(result);
  }

  @Get(':tutoringSessionId/student-progress')
  async getStudentProgressForTutoringSession(
    @Param('tutoringSessionId') tutoringSessionId: string,
  ) {
    const studentProgress =
      await this.tutoringsessionService.getTutoringSessionWithStudentProgressById(
        tutoringSessionId,
      );

    return studentProgress;
  }
}
