import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { authHelper } from '../helpers/auth-helper';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUpUser(body: CreateUserDto) {
    const user = await this.userService.findUserByEmail(body.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const password = await authHelper.hashPassword(body.password);
    await this.userService.createUser({
      ...body,
      password,
    });
    return {
      message: 'User created successfully',
    };
  }

  async loginUser(body: LoginUserDto) {
    const user = await this.userService.findUserByEmail(body.email);
    if (
      !user ||
      !(await authHelper.verifyPassword(body.password, user.password))
    )
      throw new HttpException(
        'invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    const payload = { email: user.email, id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: authHelper.serializeUser(user),
    };
  }
}
