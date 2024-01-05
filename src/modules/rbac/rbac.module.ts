import { Module } from '@nestjs/common';

import { RoleRepoModule } from '@/modules/access-control/repo/role.repo.module';
import { RbacService } from '@/modules/rbac/rbac.service';

@Module({
  imports: [RoleRepoModule],
  providers: [RbacService],
  exports: [RbacService],
})
export class RbacServiceModule {}
