import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from './middleware/user.middleware';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { NotFoundExceptionFilter } from './exception/notfound.exception';
import { PhoneNumberValidationPipe } from './pipes/phone_number.pipes';

@Module({
  controllers: [UserController],
  providers: [UserService,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  
  ],
})

export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UserController);
  }
}
