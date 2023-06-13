import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return { userName: 'Inson', email: 'inson.com' };
  }

  @Post('')
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return {};
  }
}
