import UserRepository from "../repositories/UserRepository";

export default class DeleteUserUseCase {
  userRepo: UserRepository;

  constructor(
    userRepo: UserRepository
  ) {
    this.userRepo = userRepo;
  }

  async execute(id: string) {
    const user = await this.userRepo.getUser(id);

    if(!user) {
      throw new Error('Este usuário não existe');
    }

    const deleted = this.userRepo.deleteUser(id);

    return deleted;
  }
}