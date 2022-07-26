import { NotFoundException } from "./RequestExceptions";

export class PostNotFoundException extends NotFoundException {
  title = 'Post not found'

  constructor(message: string) {
    super();
    this.message = message;
  }
}