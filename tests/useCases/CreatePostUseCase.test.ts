import { UserNotFoundException } from "../../src/core/exceptions/UserExceptions";
import CreatePostUseCase from "../../src/core/useCases/CreatePostUseCase";
import InMemoryPostRepository from "../repositories/InMemoryPostRepository"
import InMemoryUserRepository from "../repositories/InMemoryUserRepository";

describe('CreatePostUseCase', () => {
  test('Should throw error if user does not exist', (done) => {
    const postRepo = new InMemoryPostRepository();
    const userRepo = new InMemoryUserRepository();

    const useCase = new CreatePostUseCase(
      userRepo,
      postRepo,
    )

    useCase.execute(
      "nvbch",
      {
        body: "Novo post",
        title: "Novo post",
      }
    ).then(() => {
      done('This should not go right')
    }).catch((error) => {
      expect(error instanceof UserNotFoundException).toBe(true);
      done();
    })
  })

  test('Should go right if user is valid', async () => {
    const postRepo = new InMemoryPostRepository();
    const userRepo = new InMemoryUserRepository();

    const useCase = new CreatePostUseCase(
      userRepo,
      postRepo,
    )

    const post = await useCase.execute(
      "abc",
      {
        body: "Novo post",
        title: "Novo post",
      }
    );

    const insertedPost = await postRepo.getPost(post.id);

    expect(insertedPost).toBeDefined()

  })
})