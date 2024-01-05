import { Module } from '@nestjs/common';

import { AccessControlController } from '@/modules/access-control/controller/access-control.controller';
import { ValidateAccessController } from '@/modules/access-control/controller/validate-access.controller';
import { RoleRepoModule } from '@/modules/access-control/repo/role.repo.module';
import { CreateRole } from '@/modules/access-control/usecases/create-role';
import { GetAllRoles } from '@/modules/access-control/usecases/get-all-roles';
import { HasPermission } from '@/modules/access-control/usecases/has-permission';
import { UpdateRole } from '@/modules/access-control/usecases/update-role';
import { RbacServiceModule } from '@/modules/rbac/rbac.module';

@Module({
  imports: [RoleRepoModule, RbacServiceModule],
  providers: [CreateRole, GetAllRoles, HasPermission, UpdateRole],
  controllers: [AccessControlController, ValidateAccessController],
})
export class RbacModule {}
