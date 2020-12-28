import { IResolvers } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import { ICtx, User } from '../../../lib/types';
import { cookie } from '../../../utils/cookieHelper';
import { Loginbody } from './types';

export const LoginResolver: IResolvers = {
  Mutation: {
    login: async (
      _root: undefined,
      args: Loginbody,
      ctx: ICtx
    ): Promise<User> => {
      const { username, password, withCookie } = args.input;
      const { db, req, res } = ctx;
      try {
        const result = withCookie
          ? await cookie.loginViaCookie(db, req, res)
          : await db.users.findOne<User>({
              username,
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

        cookie.setCookie(result._id, res);

        return result;
      } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
      }
    },
  },
};



// updateSettings: authenticated(
//   (_, {input}, {user, models}) =>{
//   return models.Settings.updateOne({user: user.id}, input)
// }
// ),
