import UpdateCommentUseCase from "../../src/core/useCases/UpdateCommentUseCase";
import InMemoryCommentRepository from "../repositories/InMemoryCommentRepository"

describe('UpdateCommentUseCase', () => {
  test('Should throw an error if comment does not exists', (done) => {
    const commentRepo = new InMemoryCommentRepository();
    const useCase = new UpdateCommentUseCase(commentRepo);

    useCase.execute(
      "123",
      "Comentário editado"
    ).then(() => {
      done('This should not go right')
    }).catch(() => {
      done();
    })
  });

  test('Should update an comment correctly', async () => {
    const text = "Comentário editado";
    const commentRepo = new InMemoryCommentRepository();
    const useCase = new UpdateCommentUseCase(commentRepo);
    
    const commentEdited = await useCase.execute("abc", text);

    const comment = (await commentRepo.getComment(commentEdited.id))!;

    expect(comment.body).toBe(text);
  })
})