import { IResolvers } from 'apollo-server-express';
import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import bcrypt from 'bcrypt';
import { Database, ICtx } from '../../../lib/types';
import { setCookie } from '../../../utils/setCookie';
import { Loginbody, User } from './types';

const loginViaCookie = async (db: Database, req: Request, res: Response) => {
  const result = await db.users.findOne({
    _id: new ObjectID(req.signedCookies.admin),
  });

  if (!result) {
    res.clearCookie('admin');
    return null;
  }

  return result;
};

export const LoginResolver: IResolvers = {
  Mutation: {
    login: async (
      _root: undefined,
      args: Loginbody,
      ctx: ICtx
    ): Promise<User> => {
      const { username, password, withCookie } = args.input
      const { db, req, res } = ctx
      try {
        const result = withCookie
          ? await loginViaCookie(db, req, res)
          : await db.users.findOne<User>({
              username
            });

        if (!result && withCookie) {
          return {};
        }

        if (!result) {
          throw new Error(
            'User does not exist, Please confirm your username is correct'
          );
        }

        if (!withCookie) {
          const match = await bcrypt.compare(
            password,
            result.password ? result.password : ''
          );

          if (!match)
            throw new Error(
              'Wrong Password, Please Try again with the correct password'
            );
        }

        setCookie(result._id, res);

        return result
      } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
      }
    },
  },
};
