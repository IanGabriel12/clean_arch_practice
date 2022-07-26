import PostEntity, { PostDetailEntity } from "../entities/PostEntity";
import UserEntity from "../entities/UserEntity";
import { UserNotFoundException } from "../exceptions/UserExceptions";
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
    const user = await this.userRepo.getUser(userId);

    if(!user) {
      throw new UserNotFoundException('This user does not exist');
    }

    const post = new PostDetailEntity({
      title: data.title,
      body: data.body,
      writer: user,
    });

    const postId = await this.postRepo.insertPost(post);

    const newPost = ( await this.postRepo.getPost(postId) )!;

    return newPost;
  }
}