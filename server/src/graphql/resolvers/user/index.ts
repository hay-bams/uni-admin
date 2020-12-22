import { IResolvers } from "apollo-server-express";
import { Response } from "express";
import { ICtx } from "../../../lib/types";

import { cookieOptions } from "../../../utils/setCookie";
import { User } from "../login/types";

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
  },
}