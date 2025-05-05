interface baseUser {
  id: string;
  username: string;
  email: string;
}
export interface interUserDTO extends baseUser {
  roleId: string;
  role: { name: string };
}
