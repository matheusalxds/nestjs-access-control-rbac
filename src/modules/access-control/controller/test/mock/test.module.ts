import { Module } from '@nestjs/common';

import { RbacModule } from '@/modules/access-control/rbac.module';
import { DbModule } from '@/shared/database/mongodb/database.module';
import { IdGeneratorModule } from '@/shared/id-generator/id-generator.module';

@Module({
  imports: [DbModule, RbacModule, IdGeneratorModule],
})
export class TestModule {}
