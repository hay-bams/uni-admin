export interface LoginInfo {
  username: string;
  password: string;
  withCookie: boolean;
}

export interface Loginbody {
  input: LoginInfo
}