import { interfaceAuthDTO, interfaceSigup } from './authInterface';

export const autsiguphMapper = (user: interfaceAuthDTO) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};
export const authLoginMapper = (user: interfaceSigup, jwtToken: string) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    accessToken: jwtToken,
  };
};
