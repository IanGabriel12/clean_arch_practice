import CommentEntity from "../entities/CommentEntity";
import CommentRepository from "../repositories/CommentRepository";
import PostRepository from "../repositories/PostRepository";
import UserRepository from "../repositories/UserRepository";

export default class CreateCommentUseCase {
  userRepo: UserRepository
  postRepo: PostRepository
  commentRepo: CommentRepository

  constructor(
    userRepo: UserRepository,
    postRepo: PostRepository,
    commentRepo: CommentRepository
  ) {
    this.userRepo = userRepo
    this.postRepo = postRepo
    this.commentRepo = commentRepo
  }

  async execute(userId: string, postId: string, body: string) {
    const user = await this.userRepo.getUser(userId);

    if(!user) throw new Error('Usuário não existe')

    const post = await this.postRepo.getPost(postId);

    if(!post) throw new Error('Post não existe');

    const comment = new CommentEntity({
      writer: user,
      post,
      body,
    });

    const insertedId = await this.commentRepo.insertComment(comment);
    const commentInserted = (await this.commentRepo.getComment(insertedId))!;

    return commentInserted;
  }
}