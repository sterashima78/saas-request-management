import { ApplicationRepositoryInMemory } from './application-repository-in-memory';

describe('ApplicationRepositoryInMemory', () => {
  it('should be defined', () => {
    expect(new ApplicationRepositoryInMemory()).toBeDefined();
  });
});
