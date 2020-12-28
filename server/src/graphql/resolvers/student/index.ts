import { IResolvers } from 'apollo-server-express';
import { ObjectID } from 'mongodb';
import { Course, ICtx, Student } from '../../../lib/types';
import { Authenticated } from '../../../utils/authenticate';
import {
  registerCourseArgs,
  unregisterCourseArgs,
  NewStudentArgs,
} from '../student/types';

export const StudentResolver: IResolvers = {
  Mutation: {
    addNewStudent: Authenticated(
      async (_: null, args: NewStudentArgs, ctx: ICtx): Promise<Student> => {
        try {
          const { name, email, country } = args.input;
          const { db } = ctx;

          const cursor = await db.students.find();
          let count = await cursor.count();

          if (count === 0) count = 1;

          const studentID = `ST${count + 1}`;

          const student = await db.students.insertOne({
            studentID,
            status: 'Active',
            name,
            email,
            country,
            courses: [],
          });

          return student.ops[0];
        } catch (err) {
          throw new Error(`Something went wrong: ${err}`);
        }
      }
    ),

    registerCourse: Authenticated(
      async (
        _: null,
        args: registerCourseArgs,
        ctx: ICtx
      ): Promise<Student> => {
        try {
          // TODO: Authorize before user can register course
          const { studentId, input } = args;
          const { db } = ctx;
          let student = null;

          student = await db.students.findOne({
            _id: new ObjectID(studentId),
          });

          if (!student) {
            throw new Error('Student not found');
          }

          student = await db.students.findOneAndUpdate(
            {
              _id: new ObjectID(studentId),
            },
            {
              $push: {
                courses: new ObjectID(input),
              },
            },
            { returnOriginal: false }
          );

          if (!student.value) {
            throw new Error('Courses could not be added');
          }

          return student.value;
        } catch (err) {
          throw new Error(`Something went wrong: ${err}`);
        }
      }
    ),

    unregisterCourse: Authenticated(
      async (
        _: null,
        args: unregisterCourseArgs,
        ctx: ICtx
      ): Promise<Student> => {
        try {
          // TODO: Authorize before user can register course
          const { db } = ctx;
          const { studentId, courseId } = args;

          const student = await db.students.findOneAndUpdate(
            {
              _id: new ObjectID(studentId),
            },
            {
              $pull: {
                courses: new ObjectID(courseId),
              },
            },
            { returnOriginal: false }
          );

          if (!student.value) {
            throw new Error('Courses could not be removed');
          }

          return student.value;
        } catch (err) {
          throw new Error(`Something went wrong: ${err}`);
        }
      }
    ),
  },
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
