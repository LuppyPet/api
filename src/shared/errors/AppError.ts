interface IErrorProps {
  message: string;
  statusCode?: number;
  code:
    | "generic"
    | "not.found"
    | "duplicated"
    | "unauthorized"
    | "missing.data"
    | "token.expired"
    | "token.missing"
    | "token.invalid"
    | "prisma.error"
    | "unfinished.register"
    | "incorrect.credentials";
}

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly code: string;

  constructor({ message, statusCode = 400, code }: IErrorProps) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}

export { AppError };
