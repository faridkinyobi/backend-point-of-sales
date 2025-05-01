import { db } from 'src/utils';
import { AppError } from 'src/middleware/handler-error';
import { ERROR_CODE } from 'src/interface';
import * as rolesRepository from './rolesRepository';

// creat
export const creatData = async (body: { name: string; action: string[] }) => {
  const checkRoles = await rolesRepository.getfindName(body);
  if (checkRoles) {
    return new AppError(ERROR_CODE.BAD_REQUEST.code, 'name role duplicate');
  }

  const roles = await rolesRepository.creatData(body);
  if (!roles) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      'creat role failed',
    );
  }
  return roles;
};

// get all
export const getAllData = async () => {
  const roles = await rolesRepository.getAll();
  return roles;
};

// get bay id
export const getDataById = async (id: string) => {
  const roles = await rolesRepository.getfindId(id);
  if (!roles) {
    throw new AppError(ERROR_CODE.NOT_FOUND.code, 'role not found');
  }
  return roles;
};

// delet
export const deletesData = async (id: string) => {
  // check id
  await getDataById(id);

  const roles = await rolesRepository.destroy(id);
  if (!roles) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      'delet role failed',
    );
  }
  return roles;
};

// update roles
export const updatesData = async (
  id: string,
  body: { name: string; action: string[] },
) => {
  // check id
  await getDataById(id);

  const checkroles = await rolesRepository.getfindName(body);

  if (checkroles) {
    return new AppError(ERROR_CODE.BAD_REQUEST.code, 'name role duplicate');
  }
  // const permission = body.action.map((action) => ({ action }));

  const roles = await rolesRepository.updatet(body, id);
  if (!roles) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      'update roles failed',
    );
  }
  return roles;
};
