import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); //HTTP프로토콜에 관한 로거

  use(req: Request, res: Response, next: NextFunction) {
    //response에 대한 결과값도 로깅 하려면 res.on()
    res.on('finish', () => {
      //response가 finish하면
      this.logger.log(
        `${req.ip} ${req.method} ${res.statusCode}`,
        req.originalUrl,
      );
    });
    next();
  }
}
