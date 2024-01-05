import { mock, MockProxy } from 'jest-mock-extended';

import { mockRole } from '@/modules/access-control/dto/test/mocks/role.mock';
import { RoleRepo } from '@/modules/access-control/repo/role.repo';
import { Handler } from '@/modules/access-control/usecases/handler';
import { UpdateRole, UpdateIn } from '@/modules/access-control/usecases/update-role';
import { InternalServerError } from '@/shared/exception/internal-server-error.exception';

const mockParams = (): UpdateIn => ({
  _id: 'any_id',
  name: 'any_name',
  can: ['open:true'],
  inherits: [],
});

describe('UpdateRole - Handler', () => {
  let handler: UpdateRole;
  let repo: MockProxy<RoleRepo>;

  beforeEach(() => {
    repo = mock();
    repo.update.mockResolvedValue(mockRole());

    handler = new UpdateRole(repo);
  });

  test('should UpdateRole extends Handler', () => {
    expect(handler).toBeInstanceOf(Handler);
  });

  it('should call repo.update with correct param', async () => {
    const input = mockParams();

    await handler.perform(input);

    expect(repo.update).toHaveBeenCalledWith(input);
    expect(repo.update).toHaveBeenCalledTimes(1);
  });

  it('should return an edited role on success', async () => {
    const newRole = mockRole();
    newRole.can = ['edited:role'];
    repo.update.mockResolvedValueOnce(newRole);

    const role = await handler.perform(mockParams());

    expect(role).toEqual(newRole);
  });

  it('should return null if a role is not found', async () => {
    repo.update.mockResolvedValueOnce(null);

    const role = await handler.perform(mockParams());

    expect(role).toEqual(null);
  });

  test('should return 500 if perform throws', async () => {
    const error = new Error('perform_error');
    jest.spyOn(handler, 'perform').mockRejectedValueOnce(error);

    const promise = handler.handle(mockParams());

    await expect(promise).rejects.toThrow(InternalServerError);
  });
});
