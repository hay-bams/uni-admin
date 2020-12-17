import { IResolvers } from 'apollo-server-express';
import { Student } from '../../../lib/types';
import { ICtx, StudentArgs, StudentData } from './types';

export const StudentsResolver: IResolvers = {
  Query: {
    students: async (
      _root: undefined,
      args: StudentArgs,
      ctx: ICtx
    ): Promise<StudentData> => {
      const { db } = ctx;
      const { all, limit, page } = args;
      const data: StudentData = {
        total: 0,
        results: [],
      };

      let cursor = null;
      if (all) {
        cursor = await db.students.find();
      } else {
        cursor = await db.students.find();
        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);
      }

      data.total = await cursor.count();
      data.results = await cursor.toArray();

      return data;
    },
  },
  Student: {
    id: (student: Student): string => {
      return student._id.toString();
    },
  },
};
