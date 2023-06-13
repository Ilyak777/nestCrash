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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getServiceUsers() {
    //вся логика(обращение к бд и тд) должна быть заключена в сервисы. В данном случае для отправки ответа
    //используется обращение к UsersService
    return this.userService.fetchUsers();
  }

  @Get()
  getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
    // Query запрос обрабатывается декоратором Query из @nestjs/common
    console.log(sortDesc);
    return { userName: 'Inson', email: 'inson.com' };
  }

  // Все POST запросы с валидацией из пакета class-validator
  @Post('create')
  @UsePipes(new ValidationPipe()) //подключаю валидацию, которую описал в DTO
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) { // pipe инфа внутри
    // POST запрос, при котором летят данные нужно обрабатывать декоратором
    // @Body из @nestjs/common с использованием DTO для ускоренной обработки данных
    console.log(typeof userData.age);
    this.userService.createUser(userData);
    return {};
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    //ParseIntPipe = numeric string is expected
    // Обрабротка запроса с дополнительными параметрами происходит с декоратором
    // @Param из @nestjs/common
    console.log(id);
    const user = this.userService.fetchUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return this.userService.fetchUserById(id);
  }

  //остальные запросы DELETE PUT PATCH так же подятгиваются из @nestjs/common
}
