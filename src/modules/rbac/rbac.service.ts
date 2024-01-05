import { Injectable, OnModuleInit } from '@nestjs/common';
import RBAC from 'easy-rbac';

import { RoleRepo } from '@/modules/access-control/repo/role.repo';
import { ConfigRbacDTO } from '@/modules/rbac/dto/config-rbac.dto';
import { CanIn, CanOut, IRbacService } from '@/modules/rbac/rbac.interface';

@Injectable()
export class RbacService implements OnModuleInit, IRbacService {
  private rbac: RBAC;

  constructor(private readonly repo: RoleRepo) {}

  async onModuleInit(): Promise<void> {
    await this.loadConfig();
  }

  async can({ operation, role }: CanIn): Promise<CanOut> {
    return this.rbac.can(role, operation);
  }

  async loadConfig(): Promise<void> {
    const allRoles = await this.repo.getAll();
    const mergeAllRoles = allRoles.reduce((prev, next) => {
      const parsedRole = new ConfigRbacDTO(next);
      return { ...prev, ...parsedRole };
    }, {});
    this.rbac = new RBAC(mergeAllRoles);
  }
}
