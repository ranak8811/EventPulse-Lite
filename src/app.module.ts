import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EventsModule } from './events/events.module.js';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware.js';
import { EventsController } from './events/events.controller.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [EventsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes(EventsController);
  }
}
