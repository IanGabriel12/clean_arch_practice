import { BadRequestException, NotFoundException, UnauthorizedException } from "./RequestExceptions";

export class UserNotFoundException extends NotFoundException {
  title = "User not found"

  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class UsernameNotAvailableException extends BadRequestException {
  title = "Username not available"

  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class EmailNotAvailableException extends BadRequestException {
  title = "Email not available"

  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class IncorrectCredentialsException extends UnauthorizedException {
  title = "Incorrect credentials"

  constructor(message: string) {
    super();
    this.message = message;
  }
}