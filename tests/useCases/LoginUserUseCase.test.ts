import { IncorrectCredentialsException } from "../../src/core/exceptions/UserExceptions";
import LoginUserUseCase from "../../src/core/useCases/LoginUserUseCase";
import InMemoryUserRepository from "../repositories/InMemoryUserRepository"
import FakeEncrypter from "../utils/FakeEncrypter";
import FakeTokenProvider from "../utils/FakeTokenProvider";

const enc = new FakeEncrypter();
const tokenP = new FakeTokenProvider();
describe('LoginUserUseCase', () => {
  test('Should return error if username is incorrect', (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new LoginUserUseCase(
      repo,
      enc,
      tokenP
    )

    useCase.execute("etest", "123456").then(() => {
      done("This should not go right")
    }).catch((error) => {
      expect(error instanceof IncorrectCredentialsException).toBe(true);
      done();
    })
  });

  test('Should return error if password is incorrect', (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new LoginUserUseCase(
      repo,
      enc,
      tokenP
    )

    useCase.execute("teste", "1234567").then(() => {
      done("This should not go right")
    }).catch((error) => {
      expect(error instanceof IncorrectCredentialsException).toBe(true);
      done();
    })
  });

  test('Should return token if valid', (done) => {
    const repo = new InMemoryUserRepository();
    const useCase = new LoginUserUseCase(
      repo,
      enc,
      tokenP
    )

    useCase.execute("teste", "123456").then((resp) => {
      expect(resp.token).toBe("tokenabctoken")
      done();
    }).catch(() => {
      done("This went wrong");
    })
  });
})