import PostEntity, { PostDetailEntity } from "../../src/core/entities/PostEntity";
import PostRepository from "../../src/core/repositories/PostRepository";
import db, { FakeDB } from "./FakeDatabase";

export default class InMemoryPostRepository implements PostRepository {
  db: FakeDB
  constructor() {
    this.db = db;
  }

  async insertPost(post: PostDetailEntity): Promise<string> {
    this.db.posts.push(post);
    return post.id;
  }

  async updatePost(newPost: PostDetailEntity): Promise<string> {
    const index = this.db.posts.findIndex(post => post.id === newPost.id);

    this.db.posts[index].body = newPost.body;
    this.db.posts[index].title = newPost.title;
    this.db.posts[index].updated_at = new Date();

    return newPost.id;
  }

  async getPost(id: string): Promise<PostEntity | null> {
    const post = this.db.posts.find(post => post.id === id);

    if(!post) return null;

    const entity = new PostEntity({
      id: post.id,
      title: post.title,
      created_at: post.created_at,
      updated_at: post.updated_at,
    })

    return entity;
  }

  async getPostDetail(id: string): Promise<PostDetailEntity | null> {
    const post = this.db.posts.find(post => post.id === id);

    if(!post) return null;
    
    return post
  }

  async listPostsFromUser(userId: string): Promise<PostEntity[]> {
    const posts = this.db.posts.filter(post => post.writer.id === userId);

    return posts.map(post => new PostEntity({
      id: post.id,
      title: post.title,
      created_at: post.created_at,
      updated_at: post.updated_at,
    }))
  }

  async deletePost(id: string): Promise<boolean> {
    const index = this.db.posts.findIndex(post => post.id === id);
    this.db.posts.splice(index, 1);
    return true;
  }
}