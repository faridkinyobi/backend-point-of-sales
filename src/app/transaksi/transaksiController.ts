import { Response, Request, NextFunction } from 'express';

import * as serviceTransaksi from './transaksiService';;
import { AppError } from 'src/middleware';

export const postTransaksi = async (
  req: Request & { user?: { id: string | undefined } },
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  const userId = req.user?.id ?? '';
  const result = await serviceTransaksi.creatData(body, userId);

  if (result instanceof AppError) {
    next(result);
    return;
  }
  res.status(201).json({
    success: true,
    data: result,
  });
};
// export const getAllTransaksi = async (
//   req: Request & { query: QueryParams },
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { query } = req;
//   const result = await serviceTransaksi.getAllData(query);
//   if (result instanceof AppError) {
//     next(result);
//     return;
//   }
//   res.status(200).json({ success: true, data: result });
// };
// export const getByIdTransaksi = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { id } = req.params;
//   const result = await serviceTransaksi.getBayID(id);
//   if (result instanceof AppError) {
//     next(result);
//     return;
//   }
//   res.status(200).json({ success: true, data: result });
// };
// export const deletTransaksi = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { id } = req.params;

//   const result = await serviceTransaksi.deletes(id);
//   if (result instanceof AppError) {
//     next(result);
//     return;
//   }
//   res.status(200).json({ success: true, data: result });
// };
// export const updateTransaksi = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { id } = req.params;
//   const { body } = req;
//   const result = await serviceTransaksi.updates(body, id);
//   if (result instanceof AppError) {
//     next(result);
//     return;
//   }
//   res.status(200).json({ status: true, data: result });
// };
