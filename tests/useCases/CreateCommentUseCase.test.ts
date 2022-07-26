import { PostNotFoundException } from "../../src/core/exceptions/PostExceptions";
import { UserNotFoundException } from "../../src/core/exceptions/UserExceptions";
import CreateCommentUseCase from "../../src/core/useCases/CreateCommentUseCase";
import InMemoryCommentRepository from "../repositories/InMemoryCommentRepository"
import InMemoryPostRepository from "../repositories/InMemoryPostRepository";
import InMemoryUserRepository from "../repositories/InMemoryUserRepository";

describe('CreateCommentUseCase', () => {
  test('Should throw an error if user does not exist', (done) => {
    const commentRepo = new InMemoryCommentRepository();
    const userRepo = new InMemoryUserRepository();
    const postRepo = new InMemoryPostRepository()

    const useCase = new CreateCommentUseCase(
      userRepo,
      postRepo,
      commentRepo
    );

    useCase.execute(
      "123",
      "abcd",
      "Comentário teste"
    ).then(() => {
      done('This should not go right')
    }).catch((error) => {
      expect(error instanceof UserNotFoundException).toBe(true);
      done();
    })
  })

  test('Should throw an error if post does not exist', (done) => {
    const commentRepo = new InMemoryCommentRepository();
    const userRepo = new InMemoryUserRepository();
    const postRepo = new InMemoryPostRepository()

    const useCase = new CreateCommentUseCase(
      userRepo,
      postRepo,
      commentRepo
    );

    useCase.execute(
      "abc",
      "123",
      "Comentário teste"
    ).then(() => {
      done('This should not go right')
    }).catch((error) => {
      expect(error instanceof PostNotFoundException).toBe(true);
      done();
    });
  })

  test('Should insert a comment in the database', async () => {
    const commentRepo = new InMemoryCommentRepository();
    const userRepo = new InMemoryUserRepository();
    const postRepo = new InMemoryPostRepository()

    const useCase = new CreateCommentUseCase(
      userRepo,
      postRepo,
      commentRepo
    );

    const comment = await useCase.execute(
      "abc",
      "abcd",
      "Comentário teste"
    )

    const newComment = await commentRepo.getComment(comment.id);

    expect(newComment).not.toBeNull();
  })
})