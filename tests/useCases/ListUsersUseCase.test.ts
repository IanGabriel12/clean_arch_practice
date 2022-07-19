import ListUsersUseCase from "../../src/core/useCases/ListUsersUseCase";
import InMemoryUserRepository from "../repositories/InMemoryUserRepository";

describe("ListUsersUseCase", () => {
  test("Should return all the users", (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new ListUsersUseCase(repo);

    useCase
      .execute()
      .then((resp) => {
        expect(Array.isArray(resp)).toBe(true);
        expect(resp.length).toBeGreaterThan(0);
        done();
      })
      .catch(() => {
        done("This went wrong");
      });
  });
});
