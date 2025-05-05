import { Request, Response, NextFunction } from 'express';
import { AppError } from 'src/middleware/handler-error';
import * as userService from './usersService';
import { QueryParams } from 'src/interface';

// getAll
export const getUser = async (
  req: Request & { query: QueryParams },
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;

  const result = await userService.getAllData(query);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};

// delet
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const result = await userService.deletesData(id);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};
