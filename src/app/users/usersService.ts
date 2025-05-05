import { AppError } from 'src/middleware/handler-error';
import { ERROR_CODE, QueryParams } from 'src/interface';
import * as usersRepository from './userRepository';
import { metaPagination } from 'src/utils';
import { usersMapperList } from './userMepper';
import { interUserDTO } from './userInterface';
// get all
export const getAllData = async (query: QueryParams) => {
  const { page = 1, perPage = 10 } = query;

  const [users, totalData] = await Promise.all([
    usersRepository.getAll(query),
    usersRepository.count(),
  ]);

  if (!users) {
    throw new AppError(ERROR_CODE.NOT_FOUND.code, 'users not found');
  }
  const meta = metaPagination(
    Number(page),
    Number(perPage),
    users.length,
    totalData,
  );

  return { users: usersMapperList(users), pagination: meta };
};

// get bay id
export const getDataById = async (id: string) => {
  const roles = await usersRepository.getfindId(id);
  if (!roles) {
    throw new AppError(ERROR_CODE.NOT_FOUND.code, 'role not found');
  }
  return roles;
};

// delet
export const deletesData = async (id: string) => {
  // check id
  await getDataById(id);

  const roles = await usersRepository.destroy(id);
  if (!roles) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      'delet role failed',
    );
  }
  return roles;
};
