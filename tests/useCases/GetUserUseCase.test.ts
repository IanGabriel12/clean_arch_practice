import { UserNotFoundException } from "../../src/core/exceptions/UserExceptions";
import GetUserUseCase from "../../src/core/useCases/GetUserUseCase";
import InMemoryUserRepository from "../repositories/InMemoryUserRepository";

describe("GetUserUseCase", () => {
  test("Should throw an error if user does not exists", (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new GetUserUseCase(repo);

    useCase
      .execute("ccc")
      .then(() => {
        done("This should not go right");
      })
      .catch((error) => {
        expect(error instanceof UserNotFoundException).toBe(true);
        done();
      });
  });

  test("Should return the user when it exists", (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new GetUserUseCase(repo);

    useCase
      .execute("abc")
      .then((user) => {
        expect(user.username).toBe("teste");
        done();
      })
      .catch(() => {
        done("This went wrong");
      });
  });
});
