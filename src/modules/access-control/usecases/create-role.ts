import { Injectable } from '@nestjs/common';
import { PickType } from '@nestjs/swagger';

import { RoleBaseDTO, RoleDTO } from '@/modules/access-control/dto/role.dto';
import { RoleRepo } from '@/modules/access-control/repo/role.repo';
import { Handler } from '@/modules/access-control/usecases/handler';
import { IHandler } from '@/modules/access-control/usecases/handler.interface';
import { RbacService } from '@/modules/rbac/rbac.service';

export class CreateIn extends RoleBaseDTO {}
export class CreateOut extends PickType(RoleDTO, ['_id']) {}

@Injectable()
export class CreateRole extends Handler<CreateIn, CreateOut> implements IHandler<CreateIn, CreateOut> {
  constructor(
    private readonly repo: RoleRepo,
    private readonly rbac: RbacService,
  ) {
    super();
  }

  async perform(input: CreateIn): Promise<CreateOut> {
    const role = await this.repo.getOne(input);
    if (role?._id) return { _id: role._id };
    const _id = await this.repo.create(input);
    await this.rbac.loadConfig();
    return { _id };
  }
}
