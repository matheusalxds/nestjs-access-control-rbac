import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Env } from '@/shared/env/env';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<Env, true>) => ({
        uri:
          configService.get('NODE_ENV')?.toLowerCase() === 'testing'
            ? process.env.MONGO_URI
            : configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
