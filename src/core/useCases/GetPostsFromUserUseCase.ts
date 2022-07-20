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

    if(!user) throw new Error('Usuário não existe');

    const posts = await this.postRepo.listPostsFromUser(userId);

    return posts;
  }
}