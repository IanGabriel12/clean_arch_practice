import { PostNotFoundException } from "../../src/core/exceptions/PostExceptions";
import GetPostUseCase from "../../src/core/useCases/GetPostUseCase";
import InMemoryPostRepository from "../repositories/InMemoryPostRepository"

describe('GetPostUseCase', () => {
  test('Should throw an error if post does not exists', (done) => {
    const postRepo = new InMemoryPostRepository();
    const useCase = new GetPostUseCase(postRepo);

    useCase.execute('123').then(() => {
      done('This should not go right')
    }).catch((error) => {
      expect(error instanceof PostNotFoundException).toBe(true);
      done()
    })
  })

  test('Retrieve post info if it exists', (done) => {
    const postRepo = new InMemoryPostRepository();
    const useCase = new GetPostUseCase(postRepo);

    useCase.execute('abcd').then((post) => {
      expect(post.body).toBeDefined();
      done();
    }).catch(() => {
      done('This went wrong');
    })
  })
})