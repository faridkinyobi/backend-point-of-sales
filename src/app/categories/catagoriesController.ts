import { Request, Response, NextFunction } from 'express';
import { AppError } from 'src/middleware/handler-error';
import * as categorisService from './catagorisService';

// getAll
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await categorisService.getAll();
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};

// creat
export const postCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const result = await categorisService.creat(body);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(201).json({
    success: true,
    data: result,
  });
};
// get id
export const getByIdCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const result = await categorisService.getfindId(id);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};
// delet
export const deleteCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const result = await categorisService.destory(id);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};
// update
export const updateCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { body } = req;
  const result = await categorisService.update(id, body);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};
