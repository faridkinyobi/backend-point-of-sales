import { db } from 'src/utils';
import { interfaceAuth } from './authInterface';

export const creatData = (user: interfaceAuth) => {
  return db.user.create({
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
      roleId: user.roleId,
    },
    include: {
      role: {
        select: { name: true },
      },
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: { email },
    include: { role: { select: { name: true } } },
  });
};

export const getUserByUsername = async (username: string) => {
  return db.user.findFirst({ where: { username: username } });
};
