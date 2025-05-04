export interface interfaceAuth {
  id: string;
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
  roleId: string;
  role: string;
}
interface baseUser {
  id: string;
  username: string;
  email: string;
}
export interface interfaceAuthDTO extends baseUser {
  roleId: string;
  role: { name: string };
}
export interface interfaceSigup extends baseUser {
  role: string;
}
