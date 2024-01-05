import { Module } from '@nestjs/common';

import { RbacModule } from '@/modules/access-control/rbac.module';
import { DbModule } from '@/shared/database/mongodb/database.module';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [SharedModule, DbModule, RbacModule],
})
export class AppModule {}
