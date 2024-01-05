import { Injectable } from '@nestjs/common';

import { RoleDTO } from '@/modules/access-control/dto/role.dto';
import { RoleRepo } from '@/modules/access-control/repo/role.repo';
import { Handler } from '@/modules/access-control/usecases/handler';
import { IHandler } from '@/modules/access-control/usecases/handler.interface';

export class GetAllOut extends RoleDTO {}

@Injectable()
export class GetAllRoles extends Handler<undefined, GetAllOut[]> implements IHandler<undefined, GetAllOut[]> {
  constructor(private readonly repo: RoleRepo) {
    super();
  }

  async perform(): Promise<GetAllOut[]> {
    return this.repo.getAll();
  }
}
