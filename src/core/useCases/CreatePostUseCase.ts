import PostEntity from "../entities/PostEntity";
import UserEntity from "../entities/UserEntity";
import PostRepository from "../repositories/PostRepository";
import UserRepository from "../repositories/UserRepository";

type CreatePostDTO = {
  title: string;
  body: string;
}

export default class CreatePostUseCase {
  postRepo: PostRepository;
  userRepo: UserRepository;

  constructor(
    userRepo: UserRepository,
    postRepo: PostRepository
  ) {
    this.postRepo = postRepo;
    this.userRepo = userRepo;
  }

  async execute(userId: string, data: CreatePostDTO) {
    const post = new PostEntity({
      title: data.title,
      body: data.body,
    })

    const postId = await this.postRepo.insertPost(post, userId);

    const newPost = ( await this.postRepo.getPost(postId) )!;

    return newPost;
  }
}