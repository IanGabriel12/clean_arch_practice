import UserRepository from "../repositories/UserRepository";
import Encrypter from "../utils/Encrypter";
import TokenProvider from "../utils/TokenProvider";

export default class LoginUserUseCase {
  userRepo: UserRepository;
  encrypter: Encrypter;
  tokenProvider: TokenProvider;

  constructor(
    userRepo: UserRepository,
    encrypter: Encrypter,
    tokenProvider: TokenProvider
  ) {
    this.userRepo = userRepo;
    this.encrypter = encrypter;
    this.tokenProvider = tokenProvider;
  }

  async execute(username: string, password: string) {
    const user = await this.userRepo.getUserByUsername(username);

    if(!user) throw new Error('Usuário ou senha incorretos');

    const isPasswordCorrect = this.encrypter.compare(password, user.password);
    if(!isPasswordCorrect) throw new Error('Usuário ou senha incorretos');

    return {
      token: this.tokenProvider.createTokenFrom(user.id)
    }
  }
}