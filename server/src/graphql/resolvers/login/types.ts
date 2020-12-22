import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  username?: string;
  password?: string
}

export interface LoginInfo {
  username: string;
  password: string;
  withCookie: boolean;
}

export interface Loginbody {
  input: LoginInfo
}