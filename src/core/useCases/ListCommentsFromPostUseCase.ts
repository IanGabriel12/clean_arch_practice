import { PostNotFoundException } from "../exceptions/PostExceptions";
import CommentRepository from "../repositories/CommentRepository";
import PostRepository from "../repositories/PostRepository";

export default class ListCommentsFromPostUseCase {
  postRepo: PostRepository
  commentRepo: CommentRepository

  constructor(postRepo: PostRepository, commentRepo: CommentRepository) {
    this.postRepo = postRepo
    this.commentRepo = commentRepo
  }

  async execute(postId: string) {
    const post = await this.postRepo.getPost(postId);

    if(!post) throw new PostNotFoundException('Post does not exist');

    return await this.commentRepo.listCommentsFromPost(postId);
  }
}