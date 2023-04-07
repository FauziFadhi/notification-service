import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { VALIDATION_CODE } from '@utils/pipes';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger('AllExceptionsFilter');
  }

  catch(exception: HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request: Request = ctx.getRequest();

    const errorResponse = exception?.response;

    const errorCode = errorResponse?.error || errorResponse?.code || undefined;

    const errorMessage =
      errorResponse?.message || exception?.message || exception;

    this.logger.error(errorMessage, exception.stack);

    const meta = {
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    };

    const status = this.getStatus(exception);
    if (Array.isArray(errorMessage)) {
      const error = errorMessage.map((errmsg, index: number) => ({
        source:
          errorCode === VALIDATION_CODE
            ? {
                pointer: errmsg.field,
              }
            : undefined,
        code: errorCode,
        status: `${status}`,
        meta: index === 0 && meta,
        detail: errmsg.message,
      }));

      ctx.getResponse().status(status).send({ errors: error });
    } else {
      ctx
        .getResponse()
        .status(status)
        .send({
          errors: [
            {
              code: errorCode,
              status: `${status}`,
              meta,
              detail: errorMessage,
            },
          ],
        });
    }
  }

  private getStatus(exception: HttpException | any) {
    return exception instanceof HttpException || exception?.getStatus?.()
      ? +exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
