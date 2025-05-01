import { Request, Response, NextFunction } from 'express';
import { AppError } from 'src/middleware/handler-error';
import * as rolesService from './rolesService';

// getAll
export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await rolesService.getAllData();
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};

// creat
export const postRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req
  const result = await rolesService.creatData(body);
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
export const getByIdRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const result = await rolesService.getDataById(id);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};

// delet
export const deleteRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const result = await rolesService.deletesData(id);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};

// update
export const updateRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { body } = req;
  const result = await rolesService.updatesData(id, body);
  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(200).json({ success: true, data: result });
};
