import PostRepository from "../repositories/PostRepository"

export default class DeletePostUseCase {
  postRepo: PostRepository
  constructor(
    postRepo: PostRepository
  ) {
    this.postRepo = postRepo;
  }

  async execute(postId: string) {
    const post = await this.postRepo.getPost(postId);

    if(!post) throw new Error('Post não existe');

    const deleted = await this.postRepo.deletePost(postId);

    return deleted;
  }
} 