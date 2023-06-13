import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
    // Query запрос обрабатывается декоратором Query из @nestjs/common
    console.log(sortDesc);
    return { userName: 'Inson', email: 'inson.com' };
  }

  // Все POST запросы с валидацией из пакета class-validator
  @Post('create')
  @UsePipes(new ValidationPipe()) //подключаю валидацию, которую описал в DTO
  createUser(@Body() userData: CreateUserDto) {
    // POST запрос, при котором летят данные нужно обрабатывать декоратором
    // @Body из @nestjs/common с использованием DTO для ускоренной обработки данных
    console.log(userData);
    return {};
    
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: string) {
    //ParseIntPipe = numeric string is expected
    // Обрабротка запроса с дополнительными параметрами происходит с декоратором
    // @Param из @nestjs/common
    console.log(id);
    return { id };
  }

  //остальные запросы DELETE PUT PATCH так же подятгиваются из @nestjs/common
}
