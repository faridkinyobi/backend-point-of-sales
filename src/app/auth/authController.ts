import { Request, Response, NextFunction } from 'express';
import { AppError } from 'src/middleware/handler-error';
import * as userService from './authService';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  const result = await userService.sigup(body);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(201).json({
    success: true,
    data: result,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  const result = await userService.signin(body);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(201).json({
    success: true,
    data: result,
  });
};
