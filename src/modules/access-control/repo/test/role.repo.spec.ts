import { mock } from 'jest-mock-extended';
import { Model } from 'mongoose';

import { mockRole } from '@/modules/access-control/dto/test/mocks/role.mock';
import { RoleRepo } from '@/modules/access-control/repo/role.repo';
import { Role, RoleSchema } from '@/modules/access-control/repo/schemas/role.schema';
import { MongoHelper } from '@/shared/database/mongodb/test/db.mock';
import { IIdGenerator } from '@/shared/id-generator/id-generator.interface';

describe('RoleRepo', () => {
  let rbacModel: Model<Role>;
  let repo: RoleRepo;
  const idGen = mock<IIdGenerator>();

  beforeAll(async () => {
    await MongoHelper.connect();
    rbacModel = await MongoHelper.registerModule(Role.name, RoleSchema);
  });

  beforeEach(async () => {
    await MongoHelper.dropCollections();
    idGen.gen.mockReturnValue('new_id');

    repo = new RoleRepo(rbacModel, idGen);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('create()', () => {
    it('should call IdGen correctly', async () => {
      await repo.create(mockRole());

      expect(idGen.gen).toHaveBeenCalledTimes(1);
    });

    it('should create a role', async () => {
      const result = await repo.create(mockRole());

      expect(result).toBeTruthy();
    });
  });

  describe('get()', () => {
    it('should return a role on success', async () => {
      const mockedRole = mockRole();
      await rbacModel.insertMany([mockedRole]);

      const result = await repo.getOne(mockedRole);

      expect(result._id).toBeTruthy();
      expect(result.name).toEqual(mockedRole.name);
      expect(result.can).toEqual(mockedRole.can);
    });
  });

  describe('getAll()', () => {
    it('should return a role on success', async () => {
      await rbacModel.insertMany([mockRole(), mockRole(), mockRole()]);

      const roles = await repo.getAll();

      expect(roles).toHaveLength(3);
    });
  });

  describe('update()', () => {
    it('should return true on success', async () => {
      const mockedRole = mockRole();
      await rbacModel.insertMany([mockedRole]);
      const can = ['new:can', 'other:can'];
      mockedRole.can = can;

      const hasUpdated = await repo.update(mockedRole);

      expect(hasUpdated.can).toEqual(can);
    });

    it('should return null if update fails', async () => {
      const mockedRole = mockRole();
      await rbacModel.insertMany([mockedRole]);
      mockedRole._id = 'invalid_id';

      const hasUpdated = await repo.update(mockedRole);

      expect(hasUpdated).toBeNull();
    });
  });
});
