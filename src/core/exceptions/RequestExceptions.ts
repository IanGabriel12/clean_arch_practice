import BaseException from "./BaseException";

export class NotFoundException extends BaseException {
  status: number = 404;
}

export class BadRequestException extends BaseException {
  status: number = 400;
}

export class UnauthorizedException extends BaseException {
  status: number = 401;
}

export class ForbiddenException extends BaseException {
  status: number = 401;
}