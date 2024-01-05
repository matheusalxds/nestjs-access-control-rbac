import { mock, MockProxy } from 'jest-mock-extended';

import { Handler } from '@/modules/access-control/usecases/handler';
import { HasPermission, HasPermissionIn } from '@/modules/access-control/usecases/has-permission';
import { RbacService } from '@/modules/rbac/rbac.service';
import { InternalServerError } from '@/shared/exception/internal-server-error.exception';

describe('CreateRole - Handler', () => {
  let handler: HasPermission;
  let rbac: MockProxy<RbacService>;

  beforeEach(() => {
    rbac = mock();
    rbac.can.mockResolvedValue(true);

    handler = new HasPermission(rbac);
  });

  const mockParams = (): HasPermissionIn => ({ userRole: 'any_role', can: 'open:true' });

  it('should HasPermission extends Handler', () => {
    expect(handler).toBeInstanceOf(Handler);
  });

  it('should call RBAC Service with correct param', async () => {
    const input = mockParams();

    await handler.perform(input);

    expect(rbac.can).toHaveBeenCalledWith({ role: input.userRole, operation: input.can });
    expect(rbac.can).toHaveBeenCalledTimes(1);
  });

  it('should return false the role doesnt exist', async () => {
    rbac.can.mockResolvedValue(false);

    const { can } = await handler.perform(mockParams());

    expect(can).toBeFalsy();
  });

  it('should return true on success', async () => {
    const { can } = await handler.perform(mockParams());

    expect(can).toBeTruthy();
  });

  test('should return 500 if perform throws', async () => {
    const error = new Error('perform_error');
    jest.spyOn(handler, 'perform').mockRejectedValueOnce(error);

    const promise = handler.handle(mockParams());

    await expect(promise).rejects.toThrow(InternalServerError);
  });
});
