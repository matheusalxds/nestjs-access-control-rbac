import { PickType } from '@nestjs/swagger';

import { RoleBaseDTO, RoleDTO } from '@/modules/access-control/dto/role.dto';

export class UpdateParamsDTO extends PickType(RoleDTO, ['_id']) {}

export class UpdateBodyDTO extends RoleBaseDTO {}
