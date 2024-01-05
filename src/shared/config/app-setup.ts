import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationError } from 'class-validator';
import { Logger, PinoLogger } from 'nestjs-pino';

import { redocSetup } from '@/shared/config/redoc-setup';
import { swaggerSetup } from '@/shared/config/swagger-setup';
import { EnvService } from '@/shared/env/env.service';
import { InvalidParamsError } from '@/shared/exception/invalid-params.exception';
import { ExceptionFilterError } from '@/shared/filter/error.filter';

export const appSetup = async (app: NestExpressApplication, env: EnvService) => {
  app.disable('x-powered-by');
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new ExceptionFilterError(app.get<PinoLogger>(Logger)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(errors: ValidationError[]) {
        const fields = errors.map((error) => ({ name: error.property, errors: error.constraints }));
        const paramNames = fields.map((field) => field.name);
        return new InvalidParamsError(1, paramNames, fields);
      },
    }),
  );
  swaggerSetup(app, env);
  await redocSetup(app, env);
};
