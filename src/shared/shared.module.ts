import { Module } from '@nestjs/common';

import { EnvModule } from '@/shared/env/env.module';
import { IdGeneratorModule } from '@/shared/id-generator/id-generator.module';
import { LoggerModule } from '@/shared/logger/pino-logger.module';
import { TranslateModule } from '@/shared/translator/translate.module';

@Module({
  imports: [EnvModule, LoggerModule, TranslateModule, IdGeneratorModule],
})
export class SharedModule {}
