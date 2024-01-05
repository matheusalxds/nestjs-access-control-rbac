import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';

import { HasPermissionOut } from '@/modules/access-control/usecases/has-permission';

export const HasPermissionDecorator = () =>
  applyDecorators(
    ApiOperation({ summary: 'Validate if a specific role has access to something' }),
    ApiCreatedResponse({ type: HasPermissionOut, description: 'Validate if a specific role has access to something' }),
    ApiInternalServerErrorResponse({ description: 'Something went wrong' }),
  );
