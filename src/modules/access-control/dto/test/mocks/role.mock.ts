import { v4 } from 'uuid';

import { RoleDTO } from '@/modules/access-control/dto/role.dto';

export const mockRole = (): RoleDTO => ({
  _id: v4(),
  name: 'any_role_name',
  can: ['any_role_name:save'],
  inherits: [],
});
