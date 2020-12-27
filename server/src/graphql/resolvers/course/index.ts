import { IResolvers } from 'apollo-server-express';
import { Course, ICtx } from '../../../lib/types';
import { NewCourseArgs } from './types';

export const CourseResolver: IResolvers = {
  Query: {
    allCourses: async (_, __, ctx: ICtx): Promise<Course[]> => {
      // TODO: Authorize before user can register course
      const { db } = ctx;

      const courses = await db.courses.find({});

      return courses.toArray();
    },
  },
  Mutation: {
    addNewCourse: async (
      _,
      args: NewCourseArgs,
      ctx: ICtx
    ): Promise<Course> => {
      try {
        const { name, totalSeats, status } = args.input;
        const { db } = ctx;
        let course = null;

        course = await db.courses.findOne({
          name,
        });

        if (course) {
          throw new Error('Course Already Exists');
        }

        course = await db.courses.insertOne({
          name,
          totalSeats,
          status,
        });

        return course.ops[0];
      } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
      }
    },
  },
  Course: {
    id: (course: Course): string => {
      return course._id.toString();
    },
  },
};
