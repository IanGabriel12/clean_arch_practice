import { UserNotFoundException } from "../../src/core/exceptions/UserExceptions";
import DeleteUserUseCase from "../../src/core/useCases/DeleteUserUseCase";
import InMemoryUserRepository from "../repositories/InMemoryUserRepository";

describe("DeleteUserUseCase", () => {
  test("Should throw an error if user does not exists", (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new DeleteUserUseCase(repo);

    useCase
      .execute("ccc")
      .then(() => {
        done("This should not go right");
      })
      .catch((error) => {
        expect(error instanceof UserNotFoundException).toBe(true)
        done();
      });
  });

  test("Should delete the user when it is valid", async () => {
    const repo = new InMemoryUserRepository();
    const useCase = new DeleteUserUseCase(repo);

    const deleted = await useCase.execute("abc");

    expect(deleted).toBe(true);

    const user = await repo.getUser("abc");
    expect(user).toBeNull();
  });
});
