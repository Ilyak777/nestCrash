import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { ExampleMiddleware } from './middlewares/example/example.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
//в nestjs middleware's подключаются именно так. Можно ставить их использование
//для роутов как через 'users', так и через UsersController. Так же есть метод
//forRoutes и exclude (15 строчка)
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExampleMiddleware).forRoutes(UsersController);
  }
}

// Данная конфигурация затрагивает только GET запросы на /users и users/:id
// configure(consumer: MiddlewareConsumer) {
//   consumer.apply(ExampleMiddleware).forRoutes(
//{
//   path: 'users',
//   method: RequestMethod.GET
// },
// {
//   path: 'users/:id',
//   method: RequestMethod.GET
// }
//);
// }
