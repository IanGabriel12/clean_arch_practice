import { NotFoundException } from "./RequestExceptions";

export class CommentNotFoundException extends NotFoundException {
  title = "Comment not found"

  constructor(message: string) {
    super();
    this.message = message;
  }
}