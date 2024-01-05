import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateDecorator,
  GetAllDecorator,
  UpdateDecorator,
} from '@/modules/access-control/controller/decorator/access-control.decorator';
import { UpdateBodyDTO, UpdateParamsDTO } from '@/modules/access-control/controller/dto/update-controller.dto';
import { CreateIn, CreateOut, CreateRole } from '@/modules/access-control/usecases/create-role';
import { GetAllOut, GetAllRoles } from '@/modules/access-control/usecases/get-all-roles';
import { UpdateOut, UpdateRole } from '@/modules/access-control/usecases/update-role';

@ApiTags('Access Control')
@Controller('access-control')
export class AccessControlController {
  constructor(
    private readonly createRole: CreateRole,
    private readonly getAllRole: GetAllRoles,
    private readonly updateRole: UpdateRole,
  ) {}

  @Post()
  @CreateDecorator()
  async create(@Body() body: CreateIn): Promise<CreateOut> {
    return this.createRole.handle(body);
  }

  @Get()
  @GetAllDecorator()
  async getAll(): Promise<GetAllOut[]> {
    return this.getAllRole.handle(null);
  }

  @Put('/:_id')
  @UpdateDecorator()
  async update(@Body() { can, inherits, name }: UpdateBodyDTO, @Param() params: UpdateParamsDTO): Promise<UpdateOut> {
    return this.updateRole.handle({ _id: params._id, can, inherits, name });
  }
}
