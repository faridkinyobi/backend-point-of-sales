import { db } from 'src/utils';
import { AppError } from 'src/middleware/handler-error';
import { ERROR_CODE } from 'src/interface';
import * as catagorisRepository from './catagoriesRepository';

// creat
export const creatData = async (body: { name: string }) => {
  const checkCategory = await catagorisRepository.getfindName(body);
  if (checkCategory) {
    return new AppError(ERROR_CODE.BAD_REQUEST.code, 'duplicate name');
  }

  const category = await catagorisRepository.creatData(body);
  if (!category) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      'Creat catagory failed',
    );
  }
  return category;
};

// get all
export const getAllData = async () => {
  const category = await catagorisRepository.getAll();
  return category;
};

// get bay id
export const getDataById = async (id: string) => {
  const category = await catagorisRepository.getfindId(id);
  if (!category) {
    throw new AppError(ERROR_CODE.NOT_FOUND.code, 'Category not found');
  }
  return category;
};

// delet
export const deletesData = async (id: string) => {
  // check id
  await getDataById(id);

  const category = await catagorisRepository.destroy(id);
  if (!category) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      'Delet catagory failed',
    );
  }
  return category;
};

// update
export const updatesData = async (id: string, body: { name: string }) => {
  // check id
  await getDataById(id);

  const checkCategory = await catagorisRepository.getfindName(body);
  if (checkCategory) {
    return new AppError(ERROR_CODE.BAD_REQUEST.code, 'duplicate name');
  }
  const category = await catagorisRepository.updatet(body, id);
  if (!category) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      'Update category failed',
    );
  }
  return category;
};
