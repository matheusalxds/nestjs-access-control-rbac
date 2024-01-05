import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HasPermissionDecorator } from '@/modules/access-control/controller/decorator/validate-access.decorator';
import { HasPermission, HasPermissionIn, HasPermissionOut } from '@/modules/access-control/usecases/has-permission';

@ApiTags('Validate Access')
@Controller('validate-access')
export class ValidateAccessController {
  constructor(private readonly hasPermission: HasPermission) {}

  @Post()
  @HasPermissionDecorator()
  async validatePermission(@Body() body: HasPermissionIn): Promise<HasPermissionOut> {
    return this.hasPermission.handle(body);
  }
}
