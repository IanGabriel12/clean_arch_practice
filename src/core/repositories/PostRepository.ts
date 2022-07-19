import PostEntity from "../entities/PostEntity";

export default interface PostRepository {
  insertPost(post: PostEntity): Promise<PostEntity>;
  updatePost(newPost: PostEntity): Promise<PostEntity>;
  getPost(id: string): Promise<PostEntity>;
  listPostsFromUser(userId: string): Promise<PostEntity[]>;
  deletePost(id: string): Promise<boolean>;
}