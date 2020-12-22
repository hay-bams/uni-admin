import { IResolvers } from "apollo-server-express";
import { User } from "../login/types";

export const UserResolver: IResolvers = {
  User: {
    id: (user: User) => user._id,
    madeRequest: () => true,
  },
}