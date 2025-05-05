import { interUserDTO } from './userInterface';

export const usersMapperList = (users: interUserDTO[]) => {
    return users.map(usersMapper);
};
export const usersMapper = (user: interUserDTO) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    roleId: user.roleId,
    role: user.role.name,
  };
};

