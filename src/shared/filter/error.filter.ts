import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { ErrorDTO } from '@/shared/filter/dto/error.dto';
import { t } from '@/shared/translator/i18n/t';

const getStatusCode = (exception: HttpException): number =>
  exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

const getErrorMessage = (exception: HttpException) => exception.getResponse();

@Catch(HttpException)
export class ExceptionFilterError implements ExceptionFilter {
  constructor(@InjectPinoLogger(ExceptionFilterError.name) private readonly logger: PinoLogger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const i18n = I18nContext.current(host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = getStatusCode(exception);
    const defaultValueMsg = statusCode === 404 ? 'error.route_not_found' : 'error.server';

    const {
      source,
      internal = 'ISE-01',
      stackError,
      args,
      throwError,
    } = getErrorMessage(exception) as {
      source: string;
      internal: string;
      stackError: string;
      args?: object;
      throwError: any;
    };
    const translatedErrorMsg: string = i18n.t(t(source), { args, defaultValue: i18n.t(t(defaultValueMsg)) });

    this.loggingError(statusCode, translatedErrorMsg, internal, stackError);

    response.status(statusCode).json(
      new ErrorDTO({
        message: translatedErrorMsg,
        statusCode,
        path: request.url,
        ...(throwError && { errors: throwError }),
      }),
    );
  }

  private loggingError(code: number, msg: string, internalCode: string, stackError: string) {
    if (code > 299 && code < 400) this.logger.warn(msg);
    if (code >= 400) this.logger.error({ context: ExceptionFilterError.name, msg, internalCode, stackError });
  }
}
