import BasePostEntity from "../entities/PostEntity";
import { PostDetailEntity } from "../entities/PostEntity";


export default interface PostRepository {
  insertPost(post: PostDetailEntity): Promise<string>;
  updatePost(newPost: PostDetailEntity): Promise<string>;
  getPost(id: string): Promise<BasePostEntity | null>;
  getPostDetail(id: string): Promise<PostDetailEntity | null>
  listPostsFromUser(userId: string): Promise<BasePostEntity[]>;
  deletePost(id: string): Promise<boolean>;
}