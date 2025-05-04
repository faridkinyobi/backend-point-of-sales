import e, { NextFunction, Response, Request } from 'express';
import { AppError } from './handler-error';
import { ERROR_CODE, AuthPayload } from 'src/interface';
import { verifyAccessToken } from 'src/utils';
import jwt from 'jsonwebtoken';
import { type RequestWithAuthPayload } from 'src/interface';
import { token } from 'morgan';
import config from '../config';
export interface RequestWithAuth extends Request {
  user?: AuthPayload;
}
export const authentication = async (
  req: RequestWithAuth,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError(
        ERROR_CODE.UNAUTHORIZED.code,
        'Authentication invalid',
      );
    }
    const decoded = verifyAccessToken(token) as AuthPayload;
  

    if (Object.keys(decoded).length === 0 || decoded === null) {
      throw new AppError(
        ERROR_CODE.UNAUTHORIZED.code,
        'Authentication invalid',
      );
    }
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};
