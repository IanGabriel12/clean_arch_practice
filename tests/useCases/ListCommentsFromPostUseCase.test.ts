import { PostNotFoundException } from "../../src/core/exceptions/PostExceptions";
import ListCommentsFromPostUseCase from "../../src/core/useCases/ListCommentsFromPostUseCase";
import InMemoryCommentRepository from "../repositories/InMemoryCommentRepository";
import InMemoryPostRepository from "../repositories/InMemoryPostRepository"

describe('ListCommentsFromPostUseCase', () => {
  test('Should throw an error if post does not exist', (done) => {
    const postRepo = new InMemoryPostRepository();
    const commentRepo = new InMemoryCommentRepository();
    const useCase = new ListCommentsFromPostUseCase(
      postRepo,
      commentRepo,
    );

    useCase
      .execute("123")
      .then(() => done('This should not go right'))
      .catch((error) => {
        expect(error instanceof PostNotFoundException).toBe(true)
        done()
      })
  });

  test('Should list the comments from a post', async () => {
    const postRepo = new InMemoryPostRepository();
    const commentRepo = new InMemoryCommentRepository();
    const useCase = new ListCommentsFromPostUseCase(
      postRepo,
      commentRepo,
    );
    const postId = "abcd";

    const comments = await useCase
      .execute(postId);
    
    const are_comments_from_post = comments.every(comment => comment.post.id === postId);

    expect(are_comments_from_post).toBe(true);
  })
})