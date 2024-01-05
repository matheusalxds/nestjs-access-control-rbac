import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import request from 'supertest';

import { TestModule } from '@/modules/access-control/controller/test/mock/test.module';
import { mockRole } from '@/modules/access-control/dto/test/mocks/role.mock';
import { Role, RoleSchema } from '@/modules/access-control/repo/schemas/role.schema';
import { MongoHelper } from '@/shared/database/mongodb/test/db.mock';

describe('AccessControlController', () => {
  let app: INestApplication;
  let roleModel: Model<Role>;
  const path = '/access-control';

  describe(path, () => {
    beforeAll(async () => {
      await MongoHelper.connect();
      roleModel = await MongoHelper.registerModule(Role.name, RoleSchema);
    });

    beforeEach(async () => {
      await MongoHelper.dropCollections();
      const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [TestModule] }).compile();
      app = moduleFixture.createNestApplication();
      await app.init();
    });

    afterAll(async () => await MongoHelper.disconnect());

    describe('POST', () => {
      it('should return 201 on success', async () => {
        const { body, statusCode } = await request(app.getHttpServer()).post(path).send(mockRole());

        expect(statusCode).toBe(HttpStatus.CREATED);
        expect(body._id).toBeTruthy();
      });
    });

    describe('GET', () => {
      it('should return 200 on success', async () => {
        await roleModel.insertMany([mockRole(), mockRole()]);

        const { body, statusCode } = await request(app.getHttpServer()).get(path);

        expect(statusCode).toBe(HttpStatus.OK);
        expect(body[0]._id).toBeTruthy();
        expect(body[1]._id).toBeTruthy();
        expect(body).toHaveLength(2);
      });

      it('should return 200 with an empty array if no roles are found', async () => {
        const { body, statusCode } = await request(app.getHttpServer()).get(path);

        expect(statusCode).toBe(HttpStatus.OK);
        expect(body).toEqual([]);
      });
    });

    describe('PUT', () => {
      it('should return 201 on success', async () => {
        const mockedRole = mockRole();
        await roleModel.insertMany([mockedRole]);

        const { body, statusCode } = await request(app.getHttpServer())
          .put(`${path}/${mockedRole._id}`)
          .send({
            name: 'user',
            can: ['user:delete'],
          });

        expect(statusCode).toBe(HttpStatus.OK);
        expect(body._id).toBeTruthy();
      });
    });
  });
});
