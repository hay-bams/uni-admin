import { IResolvers } from 'apollo-server-express';
import { ObjectID } from 'mongodb';
import { Course, Student } from '../../../lib/types';
import {
  ICtx,
  StudentsArgs,
  StudentArgs,
  StudentsData,
  StudentData,
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
    student: async (_, args: StudentArgs, ctx: ICtx): Promise<StudentData> => {
      try {
        const { id } = args;
        const { db } = ctx;
        const data: StudentData = {
          student: null,
          courses: null,
        };

        const student = await db.students.findOne({
          _id: new ObjectID(id),
        });

        if (!student) {
          throw new Error('Student not found');
        }

        const coursesCursor = await db.courses.find({
          _id: { $in: student.courses },
        });

        if (!coursesCursor) {
          throw new Error('Courses not found');
        }

        const courses = await coursesCursor.toArray();
        data.student = student;
        data.courses = courses;

        return data;
      } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
      }
    },
  },
  Student: {
    id: (student: Student): string => {
      return student._id.toString();
    },
  },
  Course: {
    id: (course: Course): string => {
      return course._id.toString();
    },
  },
};
