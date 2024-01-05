import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { CreateOut } from '@/modules/access-control/usecases/create-role';
import { GetAllOut } from '@/modules/access-control/usecases/get-all-roles';
import { UpdateOut } from '@/modules/access-control/usecases/update-role';

export const CreateDecorator = () =>
  applyDecorators(
    ApiOperation({ summary: 'Creates a role' }),
    ApiCreatedResponse({ type: CreateOut, description: 'The role has been successfully created' }),
    ApiInternalServerErrorResponse({ description: 'Something went wrong' }),
  );

export const GetAllDecorator = () =>
  applyDecorators(
    ApiOperation({ summary: 'Returns a list of roles' }),
    ApiOkResponse({ type: GetAllOut, isArray: true }),
    ApiInternalServerErrorResponse({ description: 'Something went wrong' }),
  );

export const UpdateDecorator = () =>
  applyDecorators(
    ApiOperation({ summary: 'Updates a role' }),
    ApiCreatedResponse({ type: UpdateOut, description: 'The role has been successfully updated' }),
    ApiInternalServerErrorResponse({ description: 'Something went wrong' }),
  );
