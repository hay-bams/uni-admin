import { Response } from "express"
import { ObjectID } from "mongodb"

export const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development' ? false : true
}

export const setCookie = (id: ObjectID | undefined, res: Response) => {
  if(id) {
    res.cookie('admin', id, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 365
    })
  }
}