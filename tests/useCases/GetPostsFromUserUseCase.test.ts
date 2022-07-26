import { UserNotFoundException } from "../../src/core/exceptions/UserExceptions";
import GetPostsFromUserUseCase from "../../src/core/useCases/GetPostsFromUserUseCase";
import InMemoryPostRepository from "../repositories/InMemoryPostRepository";
import InMemoryUserRepository from "../repositories/InMemoryUserRepository"

describe('GetPostsFromUserUseCase', () => {
  test('Should return error if user does not exist', (done) => {
    const userRepo = new InMemoryUserRepository();
    const postRepo = new InMemoryPostRepository();

    const useCase = new GetPostsFromUserUseCase(userRepo, postRepo);

    useCase.execute('123').then(() => {
      done('This should not go right')
    }).catch((error) => {
      expect(error instanceof UserNotFoundException).toBe(true);
      done();
    })
  })

  test('Should return user posts if they exists', (done) => {
    const userRepo = new InMemoryUserRepository();
    const postRepo = new InMemoryPostRepository();

    const useCase = new GetPostsFromUserUseCase(userRepo, postRepo);

    useCase.execute('abc').then((resp) => {
      expect(resp.length).toBe(2);
      done()
    }).catch(() => {
      done('This went wrong');
    })
  })
})