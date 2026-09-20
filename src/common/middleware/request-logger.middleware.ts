import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      const timestamp = new Date().toISOString();

      // ANSI কালার কোডস
      const RED = '\x1b[31m';
      const GREEN = '\x1b[32m';
      const YELLOW = '\x1b[33m';
      const RESET = '\x1b[0m';

      let statusColor = GREEN;
      let badge = 'SUCCESS';

      if (statusCode >= 500) {
        statusColor = RED;
        badge = 'SERVER_ERROR ❌';
      } else if (statusCode >= 400) {
        statusColor = RED;
        badge = 'CLIENT_ERROR ❌';
      } else if (statusCode >= 300) {
        statusColor = YELLOW;
        badge = 'REDIRECT ⚠️';
      } else {
        badge = 'SUCCESS ✅';
      }

      console.log(
        `[${timestamp}] [${method}] ${originalUrl} -> ${statusColor}[${statusCode} ${badge}]${RESET} +${duration}ms`,
      );
    });

    next();
  }
}
