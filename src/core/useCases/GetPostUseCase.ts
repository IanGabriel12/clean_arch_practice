import PostRepository from "../repositories/PostRepository";

export default class GetPostUseCase {
  postRepo: PostRepository;
  constructor(
    postRepo: PostRepository
  ) {
    this.postRepo = postRepo;
  }

  async execute(postId: string) {
    const post = await this.postRepo.getPostDetail(postId);

    if(!post) throw new Error('Este post não existe');

    return post;
  }
}