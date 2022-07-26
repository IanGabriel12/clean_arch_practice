import BasePostEntity, { PostDetailEntity } from "../entities/PostEntity";
import { PostNotFoundException } from "../exceptions/PostExceptions";
import PostRepository from "../repositories/PostRepository";

type UpdatePostDTO = {
  title?: string;
  body?: string;
}

export default class UpdatePostUseCase {
  postRepo: PostRepository;

  constructor(
    postRepo: PostRepository
  ) {
    this.postRepo = postRepo;
  }
  
  async execute(postId: string, data: UpdatePostDTO) {
    const post = await this.postRepo.getPostDetail(postId);

    if(!post) throw new PostNotFoundException('Post does not exist');

    const newPost = new PostDetailEntity({
      id: postId,
      body: data.body || post.body,
      title: data.title || post.title,
      updated_at: new Date(),
      writer: post.writer
    });

    const updatedId = await this.postRepo.updatePost(newPost);
    const updatedPost = (await this.postRepo.getPost(updatedId))!;

    return updatedPost;
  }
}