import {
  type ErrorRequestHandler,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import {
  // PrismaClientValidationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';
import { handlePrismaError } from 'src/utils';
import { ERROR_CODE, type ErrorCode, type ApiResponse } from 'src/interface';
import {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from 'jsonwebtoken';

export const response = (
  code?: ErrorCode | number,
  message?: string,
): ApiResponse<null> => {
  return {
    status: 'error' as const,
    error: {
      code: (code as ErrorCode) || ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: message || 'Something went wrong try again later',
    },
  };
};
export const handlerErrorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    res.status(err.httpStatus).json(response(err.code, err.message));
    return;
  }

  // prisma handle error
  if (err instanceof PrismaClientKnownRequestError) {
    const errorMessage: string = `${err.code} - ${handlePrismaError(err)}`;
    res
      .status(ERROR_CODE.BAD_REQUEST.httpStatus)
      .json(response(ERROR_CODE.BAD_REQUEST.code, errorMessage));
    return;
  }

  // json validate
  if (
    err instanceof SyntaxError &&
    'status' in err &&
    err.status === 400 &&
    'body' in err
  ) {
    res
      .status(ERROR_CODE.BAD_REQUEST.httpStatus)
      .json(
        response(ERROR_CODE.BAD_REQUEST.code, 'Invalid JSON payload passed.'),
      );
    return;
  }

  // jwt error / token expired / belum aktif / invalid.
  if (err instanceof TokenExpiredError || err instanceof NotBeforeError) {
    res
      .status(ERROR_CODE.UNAUTHORIZED.httpStatus)
      .json(response(ERROR_CODE.UNAUTHORIZED.code, err.message));
  }

  if (err instanceof JsonWebTokenError) {
    res
      .status(ERROR_CODE.UNAUTHORIZED.httpStatus)
      .json(response(ERROR_CODE.UNAUTHORIZED.code, 'Authentication invalid'));
    return;
  }

  res
    .status(ERROR_CODE.INTERNAL_SERVER_ERROR.httpStatus)
    .json(response(ERROR_CODE.INTERNAL_SERVER_ERROR.code));
};

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly httpStatus: number;

  constructor(errorCode: ErrorCode, customMessage?: string) {
    const { message, code, httpStatus } = ERROR_CODE[errorCode];
    super(customMessage ?? message);
    this.code = code;
    this.httpStatus = httpStatus;

    Error.captureStackTrace(this, this.constructor);
  }
}
