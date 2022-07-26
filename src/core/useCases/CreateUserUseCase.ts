import { getEffectiveConstraintOfTypeParameter } from "typescript";
import UserEntity from "../entities/UserEntity";
import { EmailNotAvailableException, UsernameNotAvailableException } from "../exceptions/UserExceptions";
import UserRepository from "../repositories/UserRepository";
import Encrypter from "../utils/Encrypter";

type CreateUserDTO = {
  username: string;
  password: string;
  name: string;
  email: string;
}

export default class CreateUserUseCase {

  userRepo: UserRepository;
  encrypter: Encrypter;

  constructor(
    userRepo: UserRepository,
    encrypter: Encrypter
  ) {
    this.userRepo = userRepo;
    this.encrypter = encrypter;
  }

  async execute(data: CreateUserDTO) {
    const userWithSameUsername = await this.userRepo.getUserByUsername(data.username);

    if(userWithSameUsername) {
      throw new UsernameNotAvailableException('Username provided is already used');
    }

    const userWithSameEmail = await this.userRepo.getUserByEmail(data.email);

    if(userWithSameEmail) {
      throw new EmailNotAvailableException('Email provided is already used');
    }

    const encryptedPassword = this.encrypter.encryptString(data.password);

    const user = new UserEntity({
      username: data.username,
      password: encryptedPassword,
      name: data.name,
      email: data.email,
    });

    const insertedUserId = await this.userRepo.insertUser(user);
    const insertedUser = (await this.userRepo.getUser(insertedUserId))!;

    return {
      id: insertedUser.id,
      name: insertedUser.name,
      email: insertedUser.email,
    };
  }
}