import { Handler } from '@/modules/access-control/usecases/handler';
import { InternalServerError } from '@/shared/exception/internal-server-error.exception';

type In = boolean;
type Out = boolean;

class ControllerStub extends Handler<In, Out> {
  result: Out = true;

  async perform(input: any): Promise<Out> {
    return this.result;
  }
}

describe('Handler', () => {
  let sut: ControllerStub;

  beforeEach(() => {
    sut = new ControllerStub();
  });

  test('should ControllerStub extends Controller', async () => {
    expect(sut).toBeInstanceOf(Handler);
  });

  test('should return 500 if perform throws', async () => {
    const error = new Error('perform_error');
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error);

    const promise = sut.handle(true);

    await expect(promise).rejects.toThrow(InternalServerError);
  });

  test('should return the result of perform', async () => {
    const httpResponse = await sut.handle(true);

    expect(httpResponse).toEqual(true);
  });
});
