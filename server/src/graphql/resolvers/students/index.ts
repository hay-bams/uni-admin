import { IResolvers } from 'apollo-server-express';
import { ObjectID } from 'mongodb';
import { Student } from '../../../lib/types';
import {
  ICtx,
  StudentsArgs,
  StudentArgs,
  StudentsData,
} from './types';

export const StudentsResolver: IResolvers = {
  Query: {
    students: async (
      _,
      args: StudentsArgs,
      ctx: ICtx
    ): Promise<StudentsData> => {
      try {
        const { db } = ctx;
        const { all, limit, page } = args;

        const data: StudentsData = {
          total: 0,
          results: [],
        };

        let cursor = null;
        cursor = await db.students.find();

        if (!all) {
          cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
          cursor = cursor.limit(limit);
        }

        data.total = await cursor.count();
        data.results = await cursor.toArray();

        return data;
      } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
      }
    },
    student: async (_, args: StudentArgs, ctx: ICtx): Promise<Student> => {
      try {
        const { id } = args;
        const { db } = ctx;

        const student = await db.students.findOne({
          _id: new ObjectID(id),
        });

        if (!student) {
          throw new Error('Student not found');
        }

        return student;

      } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
      }
    },
  },
};