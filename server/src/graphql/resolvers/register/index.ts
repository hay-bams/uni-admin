import { IResolvers } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

import { ICtx, User } from '../../../lib/types';
import { cookie } from '../../../utils/cookieHelper';
import { userExist } from '../../../utils/userExists';
import { RegisterBody } from './types';

export const RegisterResolver: IResolvers = {
  Mutation: {
    register: async (
      _root: undefined,
       args: RegisterBody,
      ctx: ICtx
    ): Promise<User> => {
      try {
        const { username, password } = args.input
        const { db, res } = ctx

        const user = await userExist(db, username);

        if (user) throw new Error('user already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await (
          await db.users.insertOne({ username, password: hashedPassword })
        ).ops[0];

        if (!result) {
          throw new Error(`Could not signup  user, Try again`);
        }

        cookie.setCookie(result._id, res);

        return  result; 

      } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
      }
    },
  },
};
