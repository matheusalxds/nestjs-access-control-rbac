import { mock, MockProxy } from 'jest-mock-extended';

import { mockRole } from '@/modules/access-control/dto/test/mocks/role.mock';
import { RoleRepo } from '@/modules/access-control/repo/role.repo';
import { CreateIn, CreateRole } from '@/modules/access-control/usecases/create-role';
import { Handler } from '@/modules/access-control/usecases/handler';
import { RbacService } from '@/modules/rbac/rbac.service';
import { InternalServerError } from '@/shared/exception/internal-server-error.exception';

const mockCreateInputDTO = (): CreateIn => ({
  name: 'any_name',
  can: ['open:true'],
  inherits: [],
});

describe('CreateRole - Handler', () => {
  let handler: CreateRole;
  let repo: MockProxy<RoleRepo>;
  let rbac: MockProxy<RbacService>;

  beforeEach(() => {
    repo = mock();
    repo.create.mockResolvedValue('new_id');
    repo.getOne.mockResolvedValue(null);
    rbac = mock();

    handler = new CreateRole(repo, rbac);
  });

  test('should CreateRole extends Handler', () => {
    expect(handler).toBeInstanceOf(Handler);
  });

  it('should call repo.get with correct param', async () => {
    const input = mockCreateInputDTO();

    await handler.perform(input);

    expect(repo.getOne).toHaveBeenCalledWith(input);
    expect(repo.getOne).toHaveBeenCalledTimes(1);
  });

  it('should return a role if it already exist', async () => {
    const newRole = mockRole();
    newRole._id = 'already_exists';
    repo.getOne.mockResolvedValueOnce(newRole);

    const { _id } = await handler.perform(mockCreateInputDTO());

    expect(_id).toBe(newRole._id);
  });

  it('should call repo.create with correct params', async () => {
    const input = mockCreateInputDTO();

    await handler.perform(input);

    expect(repo.create).toHaveBeenCalledWith(input);
    expect(repo.create).toHaveBeenCalledTimes(1);
  });

  it('should call rbac.loadConfig', async () => {
    const input = mockCreateInputDTO();

    await handler.perform(input);

    expect(rbac.loadConfig).toHaveBeenCalledTimes(1);
  });

  it('should return an _id if a role was created', async () => {
    const { _id } = await handler.perform(mockCreateInputDTO());

    expect(_id).toBe('new_id');
  });

  test('should return 500 if perform throws', async () => {
    const error = new Error('perform_error');
    jest.spyOn(handler, 'perform').mockRejectedValueOnce(error);

    const promise = handler.handle(mockCreateInputDTO());

    await expect(promise).rejects.toThrow(InternalServerError);
  });
});
