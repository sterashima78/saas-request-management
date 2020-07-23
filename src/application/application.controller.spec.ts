import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from './application.module';
import { ApplicationService } from './application.service';
import { UserRepositoryInMemory } from '../user/user-repository-in-memory';
import { User } from '../user/user';
import { ApplicationRepositoryInMemory } from './application-repository-in-memory';

describe('Application Controller', () => {
  let app: INestApplication;
  let service: ApplicationService;
  let userRepository: UserRepositoryInMemory;
  let repository: ApplicationRepositoryInMemory;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApplicationModule],
    })
      .overrideProvider('Plugin')
      .useFactory({
        factory: (): { name: string }[] => [{ name: 'demo' }],
      })
      .overrideProvider('UserRepository')
      .useClass(UserRepositoryInMemory)
      .overrideProvider('ApplicationRepository')
      .useClass(ApplicationRepositoryInMemory)
      .compile();

    app = moduleRef.createNestApplication();
    service = moduleRef.get<ApplicationService>(ApplicationService);
    userRepository = moduleRef.get<UserRepositoryInMemory>('UserRepository');
    repository = moduleRef.get<ApplicationRepositoryInMemory>(
      'ApplicationRepository',
    );
    userRepository.save(new User('piyo'));
    await app.init();
  });
  it('GET /applications', () => {
    return request(app.getHttpServer())
      .get('/applications')
      .expect(200)
      .expect({
        applications: [
          {
            name: 'demo',
          },
        ],
      });
  });

  describe('POST /applications', () => {
    it('201', () => {
      return request(app.getHttpServer())
        .post('/applications')
        .send(
          `{
        "name": "demo"
      }`,
        )
        .set('Authorization', 'piyo')
        .set('Content-Type', 'application/json')
        .expect(201)
        .expect({
          id: 1,
          type: 'demo',
          createdBy: 'piyo',
        });
    });
    it('403', () => {
      return request(app.getHttpServer())
        .post('/applications')
        .set('Content-Type', 'application/json')
        .send(
          `{
        "name": "demo"
      }`,
        )
        .expect(403);
    });
    it('400', () => {
      return request(app.getHttpServer())
        .post('/applications')
        .set('Authorization', 'piyo')
        .set('Content-Type', 'application/json')
        .send(
          `{
        "name": "demo2"
      }`,
        )
        .expect(400);
    });
  });
});
