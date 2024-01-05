import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoleRepo } from '@/modules/access-control/repo/role.repo';
import { Role, RoleSchema } from '@/modules/access-control/repo/schemas/role.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
  providers: [RoleRepo],
  exports: [RoleRepo],
})
export class RoleRepoModule {}
