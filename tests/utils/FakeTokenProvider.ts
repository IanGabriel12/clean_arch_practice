import TokenProvider from "../../src/core/utils/TokenProvider";

export default class FakeTokenProvider implements TokenProvider {
  createTokenFrom(payload: string): string {
    return "token" + payload + "token";
  }
}