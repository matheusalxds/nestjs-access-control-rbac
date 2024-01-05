import * as uuid from 'uuid';

import { IIdGenerator } from '@/shared/id-generator/id-generator.interface';

export class UUIDAdapter implements IIdGenerator {
  gen(): string {
    return uuid.v4();
  }
}
