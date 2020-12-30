import { IResolvers } from "apollo-server-express";
import jwt from 'jsonwebtoken'

import { ICtx, User } from "../../../lib/types";
import { cookieOptions } from "../../../utils/cookieHelper";

export const UserResolver: IResolvers = {
  Mutation: {
    logout: (_root: undefined, _, ctx: ICtx) => {
      try {
        const { res } = ctx;
        res.clearCookie('admin', cookieOptions);

        return {};
      } catch (err) {
        throw new Error(`Something went wrong, ${err}`);
      }
    },
  },
  User: {
    id: (user: User) => user._id,
    madeRequest: () => true,
    token: (user: User) => {
      if(user._id) {
        return jwt.sign({admin: user._id}, `${process.env.SECRET}`, { expiresIn: '10h' })
      }
    }
  },
}