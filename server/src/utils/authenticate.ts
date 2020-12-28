import { ObjectID } from 'mongodb';
import {  ICtx } from '../lib/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Authenticated =  <T=any, K=any> (next: any) => async (
  root: T,
  args: K,
  ctx: ICtx
) => {
  const { db, req, res } = ctx;

  const id = req.signedCookies.admin;

  const admin = await db.users.findOne({
    _id: new ObjectID(id),
  });

  if (!admin) {
    res.clearCookie('admin');
    throw new Error('User not authenticated, please sign in first');
  }

  return next(root, args, ctx);
};
