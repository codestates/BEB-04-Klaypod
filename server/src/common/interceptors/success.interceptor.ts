import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); //controller 이전에 수행. 보통 미들웨어에서 구현해주기 때문에 딱히 필요 없음.

    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    ); //data는 response인자(controller에서 리턴한 데이터)
  }
}
