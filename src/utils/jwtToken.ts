import jwt from 'jsonwebtoken';
import { AppError } from 'src/middleware';
import { ERROR_CODE, type AuthPayload } from '../interface';
import config from 'src/config';

export const generateAccessToken = (payload: AuthPayload) => {
  console.log('Now:', Math.floor(Date.now() / 1000));
  return jwt.sign(payload, config.jwtAccessTokenSecret as jwt.Secret, {
    expiresIn: '1d', 
  });
};

export const generateRefreshToken = (payload: AuthPayload) => {
  return jwt.sign(payload, config.jwtRefreshAccessTokenSecret as jwt.Secret, {
    expiresIn: '1s',
  });
};
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.jwtAccessTokenSecret as jwt.Secret);
};

