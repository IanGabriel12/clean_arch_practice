import UserEntity from "../entities/UserEntity";
import { EmailNotAvailableException, UsernameNotAvailableException, UserNotFoundException } from "../exceptions/UserExceptions";
import UserRepository from "../repositories/UserRepository";

type UpdateUserDTO = {
  name?: string;
  email?: string;
  username?: string;
};

export default class UpdateUserUseCase {
  userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async execute(id: string, data: UpdateUserDTO) {
    const currentUser = await this.userRepo.getUser(id);

    if (!currentUser) {
      throw new UserNotFoundException("This user does not exist");
    }

    if (data.username) {
      const userWithSameUsername = await this.userRepo.getUserByUsername(
        data.username
      );

      if (userWithSameUsername && userWithSameUsername.id != id) {
        throw new UsernameNotAvailableException("This username is already used");
      }
    }

    if (data.email) {
      const userWithSameEmail = await this.userRepo.getUserByEmail(data.email);

      if (userWithSameEmail && userWithSameEmail.id != id) {
        throw new EmailNotAvailableException("This email is already used");
      }
    }

    const newUser = new UserEntity({
      id,
      name: data.name || currentUser.name,
      username: data.username || currentUser.username,
      email: data.email || currentUser.email,
      password: currentUser.password,
    });

    const updatedUserId = await this.userRepo.updateUser(newUser);
    const updatedUser = (await this.userRepo.getUser(updatedUserId))!;

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }
}
