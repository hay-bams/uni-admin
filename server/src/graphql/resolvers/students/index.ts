import { IResolvers } from "apollo-server-express";

export const StudentsResolver: IResolvers = {
  Query: {
    students: (_root: undefined, {}, _) => {
      return 'strudent'
    }
  }
}