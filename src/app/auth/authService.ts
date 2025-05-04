import { AppError } from 'src/middleware/handler-error';
import { ERROR_CODE } from 'src/interface';
import * as rolesRepository from './authRepository';
import bcrypt from 'bcrypt';
import { interfaceAuth } from './authInterface';
import { authLoginMapper, autSiguphMapper } from './authMapper';
import { generateAccessToken } from 'src/utils';
import config from 'src/config';
// creat akun
export const sigup = async (body: interfaceAuth) => {
  const hasnPassword = await bcrypt.hash(body.password, 10);
  const user = { ...body, password: hasnPassword };

  const newUser = await rolesRepository.creatData(user);
  const checkEmail = await rolesRepository.getUserByEmail(body.email);

  if (checkEmail) {
    throw new AppError(ERROR_CODE.BAD_REQUEST.code, 'username already exists');
  }
  const checkUsername = await rolesRepository.getUserByUsername(body.username);

  if (checkUsername) {
    throw new AppError(ERROR_CODE.BAD_REQUEST.code, 'username already exists');
  }

  if (!newUser) {
    throw new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      ' register role failed',
    );
  }
  return autSiguphMapper(newUser);
};

export const signin = async (body: interfaceAuth) => {
  const users = await rolesRepository.getUserByEmail(body.email);

  if (!users) {
    throw new AppError(ERROR_CODE.Forbidden.code, 'Invalid Credentials');
  }

  const verifyPassword = await bcrypt.compare(body.password, users.password);

  if (!verifyPassword) {
    throw new AppError(ERROR_CODE.Forbidden.code, 'Invalid Credentials');
  }
  const payload = {
    id: users.id,
    username: users.username,
    email: users.email,
    role: users.role.name,
  };

  const tokenJwt = await generateAccessToken(payload);
 
  return authLoginMapper(payload, tokenJwt);
};
