export default interface TokenProvider {
  createTokenFrom(payload: string): string;
}