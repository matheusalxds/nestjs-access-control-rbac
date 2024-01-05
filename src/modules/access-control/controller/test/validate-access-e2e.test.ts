import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import request from 'supertest';

import { TestModule } from '@/modules/access-control/controller/test/mock/test.module';
import { RoleDTO } from '@/modules/access-control/dto/role.dto';
import { mockRole } from '@/modules/access-control/dto/test/mocks/role.mock';
import { Role, RoleSchema } from '@/modules/access-control/repo/schemas/role.schema';
import { MongoHelper } from '@/shared/database/mongodb/test/db.mock';

describe('ValidateAccessController', () => {
  let app: INestApplication;
  let roleModel: Model<Role>;
  const path = '/validate-access';

  let mockedRole: RoleDTO;

  describe(path, () => {
    beforeAll(async () => {
      await MongoHelper.connect();
      roleModel = await MongoHelper.registerModule(Role.name, RoleSchema);
    });

    beforeEach(async () => {
      await MongoHelper.dropCollections();
      mockedRole = mockRole();
      await roleModel.insertMany([mockedRole]);

      const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TestModule] }).compile();
      app = moduleFixture.createNestApplication();
      await app.init();
    });

    afterAll(async () => await MongoHelper.disconnect());

    describe('POST', () => {
      it('should return body.can equals to true if user has permission', async () => {
        const { body, statusCode } = await request(app.getHttpServer()).post(path).send({
          userRole: mockedRole.name,
          can: mockedRole.can[0],
        });

        expect(statusCode).toBe(HttpStatus.CREATED);
        expect(body.can).toBeTruthy();
      });

      it('should return body.can equals to false if user doesnt have permission', async () => {
        const { body, statusCode } = await request(app.getHttpServer()).post(path).send({
          userRole: mockedRole.name,
          can: 'no-access:any-action',
        });

        expect(statusCode).toBe(HttpStatus.CREATED);
        expect(body.can).toBeFalsy();
      });
    });
  });
});
