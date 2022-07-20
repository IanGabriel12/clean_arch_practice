export default interface Encrypter {
  encryptString(payload: string): string;
  compare(plainText: string, encrypted: string): boolean;
}