import { UserNotFoundException } from "../exceptions/UserExceptions";
import UserRepository from "../repositories/UserRepository";

export default class GetUserUseCase {
  userRepo: UserRepository;

  constructor(
    userRepo: UserRepository
  ) {
    this.userRepo = userRepo;
  }


  async execute(id: string) {
    const user = await this.userRepo.getUser(id);

    if(!user) {
      throw new UserNotFoundException('This user does not exist');
    }

    return user;
  }
}