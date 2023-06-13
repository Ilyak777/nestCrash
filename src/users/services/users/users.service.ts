import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable() //можно использовать dependencyInjection
export class UsersService {
  private fakeUsers = [
    { username: 'Alex', email: 'alex@mail.com' },
    { username: 'Mike', email: 'mike@mail.com' },
    { username: 'Lana', email: 'lana@mail.com' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return;
  }

  fetchUserById(id: number) {
    return { id: id, username: 'Lana', email: 'lana@mail.com' };
  }
}
