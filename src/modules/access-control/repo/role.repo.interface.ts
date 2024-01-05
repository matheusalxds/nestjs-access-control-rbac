import { Role } from '@/modules/access-control/repo/schemas/role.schema';

export interface IRoleRepo {
  create: (input: Partial<Role>) => Promise<string>;
  getOne: (input: Partial<Role>) => Promise<Role>;
  getAll: () => Promise<Role[]>;
  update: (input: Role) => Promise<Role>;
}
