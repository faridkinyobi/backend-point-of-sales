import { Response, Request, NextFunction } from 'express';
import * as serviceProduct from './productService';
import { AppError } from 'src/middleware';
import { QueryParams } from 'src/interface';

export const postProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  const result = await serviceProduct.creatData(body);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(201).json({
    success: true,
    data: result,
  });
};
export const getAllProduct = async (
  req: Request & { query: QueryParams },
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;
  const result = await serviceProduct.getAllData(query);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};
export const getByIdProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const result = await serviceProduct.getBayID(id);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};
export const deletProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const result = await serviceProduct.deletes(id);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { body } = req;
  const product = await serviceProduct.updates(body, id);
  if (product instanceof AppError) {
    next(product);
    return;
  }
  res.status(200).json({ status: true, data: product });
};
