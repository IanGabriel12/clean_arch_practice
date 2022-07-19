import Encrypter from "../../src/core/utils/Encrypter";

export default class FakeEncrypter implements Encrypter {
  encryptString(payload: string): string {
    return payload + "crypted";
  }
}
