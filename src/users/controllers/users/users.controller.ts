import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return { userName: 'Inson', email: 'inson.com' };
  }

  @Post('')
  createUser() {}
}
