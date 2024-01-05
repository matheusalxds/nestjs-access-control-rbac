import { IHandler } from '@/modules/access-control/usecases/handler.interface';
import { InternalServerError } from '@/shared/exception/internal-server-error.exception';

export abstract class Handler<I, O> implements IHandler<I, O> {
  abstract perform(input: I): Promise<O>;

  async handle(input: I): Promise<O> {
    try {
      return await this.perform(input);
    } catch (error) {
      throw new InternalServerError(1, error);
    }
  }
}
