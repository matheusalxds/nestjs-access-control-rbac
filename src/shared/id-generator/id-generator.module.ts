import { Global, Module } from '@nestjs/common';

import { UUIDAdapter } from '@/shared/id-generator/uuid.adapter';

@Global()
@Module({
  providers: [UUIDAdapter],
  exports: [UUIDAdapter],
})
export class IdGeneratorModule {}
