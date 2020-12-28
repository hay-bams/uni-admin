import { ObjectID } from 'mongodb';
import jwt from 'jsonwebtoken'
import {  ICtx } from '../lib/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Authenticated =  <T=any, K=any> (next: any) => async (
  root: T,
  args: K,
  ctx: ICtx
) => {
  const { db, req, res } = ctx;
  const token = req.get("X-CSRF-TOKEN");

  const id_cookie = req.signedCookies.admin;
  const decoded = jwt.verify(`${token}`, `${process.env.SECRET}`) as { admin: string }

  if(id_cookie !== decoded.admin) {
    throw new Error('This may be a CSRF attack, please sign in')
  }

  const admin = await db.users.findOne({
    _id: new ObjectID(id_cookie),
  });

  if (!admin) {
    res.clearCookie('admin');
    throw new Error('User not authenticated, please sign in first');
  }

  return next(root, args, ctx);
};
