import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from "./auth.module";
import { UserRepositoryInMemory } from '../user/user-repository-in-memory';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
describe('Auth Controller', () => {
  let app: INestApplication;
  let service: UserService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
    .overrideProvider("UserRepository")
    .useClass(UserRepositoryInMemory)
      .compile();

    app = moduleRef.createNestApplication();
    service = moduleRef.get<UserService>(UserService);
    await app.init();
  });

  describe(`POST /auth/login`, ()=> {

    it(`201`, async () => {
      await service.save(new User("hoge"))
      return request(app.getHttpServer())
      .post('/auth/login')
      .send(`{
        "name": "hoge"
      }`)
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect({
        token: "hoge",
      });
    });

    it(`401`, async () => {
      await service.save(new User("hoge"))
      return request(app.getHttpServer())
      .post('/auth/login')
      .send(`{
        "name": "foo"
      }`)
      .set('Content-Type', 'application/json')
      .expect(401)
    });
  })
});
