import PostEntity from "../entities/PostEntity";

type PartialPost = Omit<PostEntity, "writer" | "comments">;

export default interface PostRepository {
  insertPost(post: PartialPost, writerId: string): Promise<string>;
  updatePost(newPost: PartialPost): Promise<string>;
  getPost(id: string): Promise<PartialPost | null>;
  getPostDetail(id: string): Promise<PostEntity | null>
  listPostsFromUser(userId: string): Promise<PartialPost[]>;
  deletePost(id: string): Promise<boolean>;
}