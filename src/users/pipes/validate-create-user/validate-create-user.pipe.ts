import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

//на примере данной пайпы теперь нет зависимости от того, какой тип будет у value.age
//так как мы привели данные, которые прилетят с фронта к цифре используя parseInt

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log(value, 'inside validate pipe');
    console.log(metadata);

    const parseAgeToInt = parseInt(value.age.toString());
    if (isNaN(parseAgeToInt)) {
      console.log(`${value.age} is not a number`);
      throw new HttpException(
        'Invalid type of data for property Age',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(`${value.age} is a number`);

    return { ...value, age: parseAgeToInt };
  }
}
