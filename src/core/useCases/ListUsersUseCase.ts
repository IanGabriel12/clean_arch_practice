import UserRepository from "../repositories/UserRepository";

export default class ListUsersUseCase {
  userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async execute() {
    return await this.userRepo.listUsers();
  }
}
