import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLogger, Params } from 'nestjs-pino';

/**
 * timestamp utils
 * https://github.com/iamolegga/nestjs-pino/issues/449
 *
 * custom logs
 * https://github.com/iamolegga/nestjs-pino/issues/608
 *
 * https://github.com/pinojs/pino-http#logger-options
 *
 * https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/
 *
 */

@Module({
  imports: [
    PinoLogger.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Params => ({
        pinoHttp: {
          level: configService.get('NODE_ENV').toLowerCase() === 'production' ? 'info' : 'debug',
          transport: {
            target: 'pino-pretty',
            options: {
              singleLine: true,
              colorize: true,
              ignore:
                'pid,hostname,req.headers.content-type,req.headers.connection,req.headers.content-length,req.headers.accept-encoding',
            },
          },
        },
      }),
    }),
  ],
})
export class LoggerModule {}
