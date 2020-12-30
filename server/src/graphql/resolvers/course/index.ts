import { IResolvers } from 'apollo-server-express';
import { ObjectID, ObjectId } from 'mongodb';

import { Course, ICtx } from '../../../lib/types';
import { Authenticated } from '../../../utils/authenticate';
import {
  CoursesData,
  NewCourseArgs,
  CoursesArgs,
  UpdateCourseArgs,
} from './types';

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
    courseDetails: Authenticated(
      async (_: null, args: { courseId: string }, ctx: ICtx): Promise<Course> => {
        try {
          const { courseId } = args;
          const { db } = ctx;

          const course = await db.courses.findOne({
            _id: new ObjectID(courseId),
          });

          if (!course) {
            throw new Error('Course not found');
          }

          return course;
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
    updateCourse: Authenticated(
      async (
        _: undefined,
        args: UpdateCourseArgs,
        ctx: ICtx
      ): Promise<Course | undefined> => {
        try {
          const { courseId, input } = args;
          const { db } = ctx;

          const updateRes = await db.courses.findOneAndUpdate(
            { _id: new ObjectId(courseId) },
            {
              $set: {
                name: input.name,
                totalSeats: input.totalSeats,
                status: input.status,
              },
            },
            { returnOriginal: false }
          );

          if (!updateRes) {
            throw new Error('Course not found');
          }

          return updateRes.value;
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
