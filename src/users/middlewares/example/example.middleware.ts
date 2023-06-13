import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Example Middleware');
    const { authorization } = req.headers;
    console.log(authorization);

    if (!authorization) {
      throw new HttpException('non authorised', HttpStatus.UNAUTHORIZED);
    }
    if (authorization == 'Basic YWRtaW40MkBnbWFpbC5jb206YWRtaW5QYXNzd29yZA==')
      next();
    else
      throw new HttpException(
        'Invalid Authorizaton Token',
        HttpStatus.FORBIDDEN,
      );
  }
}
