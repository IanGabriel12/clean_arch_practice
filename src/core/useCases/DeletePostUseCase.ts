import { PostNotFoundException } from "../exceptions/PostExceptions";
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

    if(!post) throw new PostNotFoundException('Post does not exist');

    const deleted = await this.postRepo.deletePost(postId);

    return deleted;
  }
} 