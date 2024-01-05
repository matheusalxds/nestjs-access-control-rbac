import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

import { Handler } from '@/modules/access-control/usecases/handler';
import { IHandler } from '@/modules/access-control/usecases/handler.interface';
import { RbacService } from '@/modules/rbac/rbac.service';

export class HasPermissionIn {
  @IsString()
  @ApiProperty({ type: String, example: 'admin' })
  userRole: string;

  @IsString()
  @ApiProperty({ type: String, example: 'user:create' })
  can: string;
}
export class HasPermissionOut {
  @IsBoolean()
  @ApiProperty({ type: Boolean, example: true })
  can: boolean;
}

@Injectable()
export class HasPermission
  extends Handler<HasPermissionIn, HasPermissionOut>
  implements IHandler<HasPermissionIn, HasPermissionOut>
{
  constructor(private readonly rbac: RbacService) {
    super();
  }

  async perform({ userRole, can }: HasPermissionIn): Promise<HasPermissionOut> {
    const hasPermission = await this.rbac.can({ operation: can, role: userRole });
    return { can: hasPermission };
  }
}
