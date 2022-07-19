import UserEntity from "../entities/UserEntity";

export default interface UserRepository {
  insertUser(user: UserEntity): Promise<string>;
  updateUser(newUser: UserEntity): Promise<string>;
  getUser(id: string): Promise<UserEntity | null>;
  listUsers(): Promise<UserEntity[]>;
  deleteUser(id: string): Promise<boolean>;
  getUserByUsername(username: string): Promise<UserEntity | null>
  getUserByEmail(email: string): Promise<UserEntity | null>
}