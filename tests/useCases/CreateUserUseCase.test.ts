import CreateUserUseCase from "../../src/core/useCases/CreateUserUseCase";
import InMemoryUserRepository from "../repositories/InMemoryUserRepository";
import FakeEncrypter from "../utils/FakeEncrypter";

const crypter = new FakeEncrypter();

describe("CreateUserUseCase", () => {
  test("Should throw an error if username already exists", (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new CreateUserUseCase(repo, crypter);

    useCase
      .execute({
        name: "Usuário teste 2",
        username: "teste",
        email: "teste@gmail.com",
        password: "123456",
      })
      .then(() => {
        done("This should not go right");
      })
      .catch(() => {
        done();
      });
  });

  test("Should throw an error if email already exists", (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new CreateUserUseCase(repo, crypter);

    useCase
      .execute({
        name: "Usuário teste 2",
        username: "teste2",
        email: "teste@email.com",
        password: "123456",
      })
      .then(() => {
        done("This should not go right");
      })
      .catch(() => {
        done();
      });
  });

  test("Should go right when it is a valid user, with encrypted password", async () => {
    const repo = new InMemoryUserRepository();
    const useCase = new CreateUserUseCase(repo, crypter);

    const user = await useCase.execute({
      name: "Usuário teste 2",
      username: "teste2",
      email: "teste2@gmail.com",
      password: "123456",
    });

    expect(user).toBeDefined();

    const fullUser = await repo.getUserByEmail(user.email);

    expect(fullUser!.password.endsWith("crypted")).toBe(true);
  });
});
