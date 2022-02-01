import { CallHandler, BadGatewayException, HttpException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(
        catchError(error => {
          // console.log(333, error);
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              return throwError(() => new HttpException('There is a unique constraint violation', 400));
            }
          }
          return throwError(() => new BadGatewayException());
        })
      )
  }
}
