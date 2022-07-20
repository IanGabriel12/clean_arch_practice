import PostEntity from "../entities/PostEntity";
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
    const post = await this.postRepo.getPost(postId);

    if(!post) throw new Error('Post não existe');

    const newPost = new PostEntity({
      body: data.body || post.body,
      title: data.title || post.title,
      updated_at: new Date()
    });

    const updatedId = await this.postRepo.updatePost(newPost);
    const updatedPost = await this.postRepo.getPost(updatedId);

    return updatedPost;
  }
}