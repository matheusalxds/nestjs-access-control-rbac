import { mock, MockProxy } from 'jest-mock-extended';

import { mockRole } from '@/modules/access-control/dto/test/mocks/role.mock';
import { RoleRepo } from '@/modules/access-control/repo/role.repo';
import { GetAllRoles } from '@/modules/access-control/usecases/get-all-roles';
import { Handler } from '@/modules/access-control/usecases/handler';
import { InternalServerError } from '@/shared/exception/internal-server-error.exception';

describe('GetAllRoles - Handler', () => {
  let handler: GetAllRoles;
  let repo: MockProxy<RoleRepo>;

  beforeEach(() => {
    repo = mock();
    repo.getAll.mockResolvedValue([mockRole(), mockRole()]);

    handler = new GetAllRoles(repo);
  });

  test('should GetAllRoles extends Handler', () => {
    expect(handler).toBeInstanceOf(Handler);
  });

  it('should call repo', async () => {
    await handler.perform();

    expect(repo.getAll).toHaveBeenCalledTimes(1);
  });

  it('should return an array of role if it already exist', async () => {
    const roles = await handler.perform();

    expect(roles).toHaveLength(2);
  });

  it('should return an empty array if no roles are found', async () => {
    repo.getAll.mockResolvedValue([]);

    const roles = await handler.perform();

    expect(roles).toHaveLength(0);
  });

  test('should return 500 if perform throws', async () => {
    const error = new Error('perform_error');
    jest.spyOn(handler, 'perform').mockRejectedValueOnce(error);

    const promise = handler.handle(null);

    await expect(promise).rejects.toThrow(InternalServerError);
  });
});
