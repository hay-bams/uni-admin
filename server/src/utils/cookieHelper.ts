import { Request, Response } from "express"
import { ObjectID } from "mongodb"

import { Database } from "../lib/types"

export const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development' ? false : true
}

export const cookie = {
  setCookie: (id: ObjectID | undefined, res: Response) => {
    if(id) {
      res.cookie('admin', id, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24 * 365
      })
    }
  },
  loginViaCookie: async (db: Database, req: Request, res: Response) => {
    const result = await db.users.findOne({
      _id: new ObjectID(req.signedCookies.admin),
    });
  
    if (!result) {
      res.clearCookie('admin');
      return null;
    }
  
    return result;
  }
}