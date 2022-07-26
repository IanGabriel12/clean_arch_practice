import { PostNotFoundException } from "../../src/core/exceptions/PostExceptions";
import DeletePostUseCase from "../../src/core/useCases/DeletePostUseCase";
import InMemoryPostRepository from "../repositories/InMemoryPostRepository"

describe('DeletePostUseCase', () => {
  test('Should throw an error if post does not exist', (done) => {
    const postRepo = new InMemoryPostRepository();
    const useCase = new DeletePostUseCase(postRepo);

    useCase.execute('123').then(() => {
      done('This should not go right')
    }).catch((error) => {
      expect(error instanceof PostNotFoundException).toBe(true);
      done();
    })
  })

  test('Should delete if post is valid', async () => {
    const postRepo = new InMemoryPostRepository();
    const useCase = new DeletePostUseCase(postRepo);

    await useCase.execute('abcd')

    const post = await postRepo.getPost('abcd');

    expect(post).toBeNull();
  })
})