import DeleteCommentUseCase from "../../src/core/useCases/DeleteCommentUseCase";
import InMemoryCommentRepository from "../repositories/InMemoryCommentRepository"

describe('DeleteCommentUseCase', () => {
  test('Should throw an error if comment does not exist', (done) => {
    const commentRepo = new InMemoryCommentRepository();
    const useCase = new DeleteCommentUseCase(commentRepo);

    useCase
    .execute('123')
    .then(() => done('This should not go right'))
    .catch(() => done());
  })

  test('Should delete a comment properly', async () => {
    const commentRepo = new InMemoryCommentRepository();
    const useCase = new DeleteCommentUseCase(commentRepo);
    const id = 'abc';

    const deleted = await useCase
    .execute(id)
    

    expect(deleted).toBe(true);

    const comment = await commentRepo.getComment(id)

    expect(comment).toBeNull();
  })
})