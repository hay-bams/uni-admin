import { IResolvers } from 'apollo-server-express';
import { Course, ICtx } from '../../../lib/types';
import { Authenticated } from '../../../utils/authenticate';
import { CoursesData, NewCourseArgs, CoursesArgs } from './types';

export const CourseResolver: IResolvers = {
  Query: {
    allCourses: Authenticated(
      async (_: null, args: CoursesArgs, ctx: ICtx): Promise<CoursesData> => {
        try {
          const { db } = ctx;
          const { all, limit, page } = args;

          const data: CoursesData = {
            total: 0,
            results: [],
          };

          let cursor = null;
          cursor = await db.courses.find({});

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
      }
    ),
  },
  Mutation: {
    addNewCourse: Authenticated(
      async (_: undefined, args: NewCourseArgs, ctx: ICtx): Promise<Course> => {
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
      }
    ),
  },
  Course: {
    id: (course: Course): string => {
      return course._id.toString();
    },
  },
};
