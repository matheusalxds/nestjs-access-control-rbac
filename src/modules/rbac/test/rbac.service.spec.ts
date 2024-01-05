import RBAC from 'easy-rbac';
import { mock, MockProxy } from 'jest-mock-extended';

import { mockRole } from '@/modules/access-control/dto/test/mocks/role.mock';
import { RoleRepo } from '@/modules/access-control/repo/role.repo';
import { CanIn } from '@/modules/rbac/rbac.interface';
import { RbacService } from '@/modules/rbac/rbac.service';

const mockCan = jest.fn().mockResolvedValue(true);

jest.mock('easy-rbac', () =>
  jest.fn().mockImplementation(() => ({
    can: mockCan,
  })),
);

const mockParams = (): CanIn => ({
  role: 'any_role',
  operation: 'open:true',
});

describe('RbacService', () => {
  let service: RbacService;
  let repo: MockProxy<RoleRepo>;

  beforeEach(() => {
    repo = mock();
    repo.getAll.mockResolvedValue([mockRole()]);

    service = new RbacService(repo);
    service.onModuleInit();
  });

  it('should call rbac.can with correct params', async () => {
    const input = mockParams();

    await service.can(input);

    expect(mockCan).toHaveBeenCalledWith(input.role, input.operation);
    expect(mockCan).toHaveBeenCalledTimes(1);
  });

  it('should call rbac.create', async () => {
    await service.can(mockParams());

    expect(RBAC).toHaveBeenCalledWith({ any_role_name: { can: ['any_role_name:save'], inherits: [] } });
    expect(RBAC).toHaveBeenCalledTimes(1);
  });

  it('should return true on success', async () => {
    const hasPermission = await service.can(mockParams());

    expect(hasPermission).toBe(true);
  });
});
