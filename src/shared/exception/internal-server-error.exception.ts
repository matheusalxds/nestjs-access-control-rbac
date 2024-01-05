import { InternalServerErrorException } from '@nestjs/common';

import { parseError } from '@/shared/translator/i18n';

export class InternalServerError extends InternalServerErrorException {
  constructor(internal = 1, stackError: Error = null) {
    super(parseError({ source: 'error.generic', internal: `SHARED-${internal}`, stackTrace: stackError }));
  }
}
