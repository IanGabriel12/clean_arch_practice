import UpdatePostUseCase from "../../src/core/useCases/UpdatePostUseCase";
import InMemoryPostRepository from "../repositories/InMemoryPostRepository"

describe('UpdatePostUseCase', () => {
  test('Should throw an error if post does not exist', (done) => {
    const postRepo = new InMemoryPostRepository();

    const useCase = new UpdatePostUseCase(postRepo);

    useCase.execute("123", {
      body: 'lorem',
      title: 'oshi'
    }).then(() => {
      done('This should not go right')
    }).catch(() => {
      done();
    });
  })

  test('Should go right when the post is valid, and edit data', async () => {
    const postRepo = new InMemoryPostRepository();

    const useCase = new UpdatePostUseCase(postRepo);

    const post = await useCase.execute("abcd", {
      body: 'lorem',
      title: 'oshi'
    });


    const updatedPost = (await postRepo.getPost(post.id))!;

    expect(updatedPost.title).toBe('oshi');

  })
})