import { Role } from '@/modules/access-control/repo/schemas/role.schema';

export class ConfigRbacDTO {
  [key: string]: {
    can: string[];
    inherits?: string[] | undefined;
  };
  constructor(role: Role) {
    this[role.name] = {
      can: role.can,
      inherits: role.inherits,
    };
  }
}
