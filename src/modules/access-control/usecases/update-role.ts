import { Injectable } from '@nestjs/common';

import { RoleDTO } from '@/modules/access-control/dto/role.dto';
import { RoleRepo } from '@/modules/access-control/repo/role.repo';
import { Handler } from '@/modules/access-control/usecases/handler';
import { IHandler } from '@/modules/access-control/usecases/handler.interface';

export class UpdateIn extends RoleDTO {}
export class UpdateOut extends RoleDTO {}

@Injectable()
export class UpdateRole extends Handler<UpdateIn, UpdateOut> implements IHandler<UpdateIn, UpdateOut> {
  constructor(private readonly repo: RoleRepo) {
    super();
  }

  async perform(input: UpdateIn): Promise<UpdateOut> {
    return this.repo.update(input);
  }
}
