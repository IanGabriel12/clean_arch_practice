import { EmailNotAvailableException, UsernameNotAvailableException, UserNotFoundException } from "../../src/core/exceptions/UserExceptions";
import UpdateUserUseCase from "../../src/core/useCases/UpdateUserUseCase";
import InMemoryUserRepository from "../repositories/InMemoryUserRepository";

describe("UpdateUserUseCase", () => {
  test("Should throw an error if the user does not exists", (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new UpdateUserUseCase(repo);

    useCase
      .execute("ccc", {
        email: "email@editado.com",
        name: "Usuário editado",
        username: "testeeditado",
      })
      .then(() => {
        done("This should not go right");
      })
      .catch((error) => {
        expect(error instanceof UserNotFoundException).toBe(true);
        done();
      });
  });

  test("Should throw an error if the user puts the email of another user", (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new UpdateUserUseCase(repo);

    useCase
      .execute("abc", {
        email: "julia@email.com",
        name: "Usuário editado",
        username: "testeeditado",
      })
      .then(() => {
        done("This should not go right");
      })
      .catch((error) => {
        expect(error instanceof EmailNotAvailableException).toBe(true);

        done();
      });
  });

  test("Should throw an error if the user puts the username of another user", (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new UpdateUserUseCase(repo);

    useCase
      .execute("abc", {
        email: "teste@editado.com",
        name: "Usuário editado",
        username: "julia",
      })
      .then(() => {
        done("This should not go right");
      })
      .catch((error) => {
        expect(error instanceof UsernameNotAvailableException).toBe(true);

        done();
      });
  });

  test("Should go right when it's valid (Full Update)", (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new UpdateUserUseCase(repo);

    useCase
      .execute("abc", {
        email: "teste@editado.com",
        name: "Usuário editado",
        username: "testeeditado",
      })
      .then((resp) => {
        expect(resp.id).toBe("abc");
        expect(resp.name).toBe("Usuário editado");
        done();
      })
      .catch(() => {
        done("This went wrong");
      });
  });

  test("Should go right when it's valid (Partial Update)", (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new UpdateUserUseCase(repo);

    useCase
      .execute("abc", {
        email: "teste@email.com",
        name: "Usuário editado",
        username: "teste",
      })
      .then((resp) => {
        expect(resp.id).toBe("abc");
        expect(resp.name).toBe("Usuário editado");
        done();
      })
      .catch(() => {
        done("This went wrong");
      });
  });
});
