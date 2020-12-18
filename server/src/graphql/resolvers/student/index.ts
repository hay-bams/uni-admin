import { IResolvers } from 'apollo-server-express';
import { Course, Student } from '../../../lib/types';
import { ICtx } from '../students/types';

export const StudentResolver: IResolvers = {
  Student: {
    id: (student: Student): string => {
      return student._id.toString();
    },
    courses: async (student: Student, _, ctx: ICtx): Promise<Course[]> => {
      const { db } = ctx;
      const coursesCursor = await db.courses.find({
        _id: { $in: student.courses },
      });

      if (!coursesCursor) {
        throw new Error('Courses not found');
      }

      const courses = await coursesCursor.toArray();
      return courses;
    },
  },
};
