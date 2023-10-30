import {
  Body,
  Controller,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/guards/role-decorator';
import { Role } from './eum/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Put(':id/deactivate')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.ADMIN)
  async deactivateUser(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.deactivateUser(id);
  }

  @Put(':id/update')
  async updateUser(
    @Param('id') userId: string,
    @Body() data: Partial<UserEntity>,
  ): Promise<UserEntity> {
    return this.userService.updateUser(userId, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
