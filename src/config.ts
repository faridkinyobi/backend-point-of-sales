import dotenv from 'dotenv';
dotenv.config();

export  default {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost',
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshAccessTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN  || '1d',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN  || '7d',
};
