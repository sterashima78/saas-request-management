import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { UserModule } from "./user.module";
import { UserRepositoryInMemory } from './user-repository-in-memory';
describe('User Controller', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    })
    .overrideProvider("UserRepository")
    .useClass(UserRepositoryInMemory)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`POST /users`, () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(`{
        "name": "hoge"
      }`)
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect({
        name: "hoge",
      });
  });
});
