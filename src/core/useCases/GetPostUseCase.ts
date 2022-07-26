import { PostNotFoundException } from "../exceptions/PostExceptions";
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

    if(!post) throw new PostNotFoundException('This post does not exist');

    return post;
  }
}