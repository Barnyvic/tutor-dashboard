import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    if (!email) return undefined;
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<UserEntity | undefined> {
    if (!id) return undefined;
    return await this.userRepository.findOne({ where: { id } });
  }

  async deactivateUser(id: string): Promise<UserEntity> {
    await this.userRepository.update(id, { isActive: false });
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async updateUser(
    userId: string,
    data: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const { created_at, updated_at, ...rest } = data;

    if (!userId) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (user.id !== userId) {
      throw new ForbiddenException('Unauthorized action');
    }

    await this.userRepository.update({ id: userId }, rest);

    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
