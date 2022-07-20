import Encrypter from "../../src/core/utils/Encrypter";

export default class FakeEncrypter implements Encrypter {
  encryptString(payload: string): string {
    return payload + "crypted";
  }

  compare(plainText: string, encrypted: string) {
    const uncrypted = encrypted.split("crypted")[0];

    return plainText === uncrypted;
  }
}
