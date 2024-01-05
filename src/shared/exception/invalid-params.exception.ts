import { BadRequestException } from '@nestjs/common';

import { parseError } from '@/shared/translator/i18n';

export class InvalidParamsError extends BadRequestException {
  constructor(internal = 1, args, throwError: any) {
    super(
      parseError({
        source: 'error.invalid_params',
        internal: `SHARED-${internal}`,
        args: { args },
        throwError,
      }),
    );
  }
}
