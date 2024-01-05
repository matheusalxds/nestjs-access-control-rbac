import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

import { Env } from '@/shared/env/env';

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<Env, true>) => ({
        fallbackLanguage: configService.get('I18N_DEFAULT_LOCALE'),
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver, new HeaderResolver(['x-lang'])],
      inject: [ConfigService],
    }),
  ],
})
export class TranslateModule {}
