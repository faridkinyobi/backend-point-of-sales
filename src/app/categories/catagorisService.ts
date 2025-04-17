import { db } from 'src/utils';
import { AppError } from 'src/middleware/handler-error';
import { ERROR_CODE } from 'src/interface';

// creat
export const creat = async (body: { name: string }) => {
  if (!body || !body.name) {
    throw new AppError(ERROR_CODE.BAD_REQUEST.code, 'name is required');
  }

  const category = await db.catagory.create({ data: body });

  return category;
};

// get all
export const getAll = async () => {
  const category = await db.catagory.findMany();
  return category;
};

// get bay id
export const getfindId = async (id: string) => {
  const category = await db.catagory.findUnique({ where: { id } });
  if (!category) {
    throw new AppError(ERROR_CODE.NOT_FOUND.code, 'Category not found');
  }
  return category;
};

// delet
export const destory = async (id: string) => {
  const result = await db.catagory.findUnique({ where: { id } });
  if (!result) {
    throw new AppError(ERROR_CODE.NOT_FOUND.code, 'Category not found');
  }
  const category = await db.catagory.delete({ where: { id } });
  return category;
};

// update
export const update = async (id: string, body: { name: string }) => {
  if (!body?.name) {
    throw new AppError(ERROR_CODE.BAD_REQUEST.code, 'name is required');
  }

  const result = await db.catagory.findUnique({ where: { id } });

  if (!result) {
    throw new AppError(ERROR_CODE.NOT_FOUND.code, 'Category not found');
  }
  const category = await db.catagory.update({
    where: { id },
    data: { ...body },
  });
  return category;
};
