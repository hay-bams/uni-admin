import { IResolvers } from "apollo-server-express";
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
  },
}