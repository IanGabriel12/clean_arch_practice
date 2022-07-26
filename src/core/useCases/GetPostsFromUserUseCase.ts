import { UserNotFoundException } from "../exceptions/UserExceptions";
import PostRepository from "../repositories/PostRepository";
import UserRepository from "../repositories/UserRepository";

export default class GetPostsFromUserUseCase {
  userRepo: UserRepository;
  postRepo: PostRepository;

  constructor(
    userRepo: UserRepository,
    postRepo: PostRepository
  ) {
    this.userRepo = userRepo;
    this.postRepo = postRepo;
  }

  async execute(userId: string) {
    const user = await this.userRepo.getUser(userId);

    if(!user) throw new UserNotFoundException('User does not exist');

    const posts = await this.postRepo.listPostsFromUser(userId);

    return posts;
  }
}