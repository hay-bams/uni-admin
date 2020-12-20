import { IResolvers } from 'apollo-server-express';
import { ObjectID } from 'mongodb';
import { Course, Student } from '../../../lib/types';
import { addCourseArgs, ICtx } from '../students/types';

export const StudentResolver: IResolvers = {
  Mutation: {
    registerCourse: async (_, args: addCourseArgs, ctx: ICtx): Promise<Student> => {
      try {
        const { studentId, input } = args;
        const { db } = ctx;
        let student = null

        student = await db.students.findOne({
          _id: new ObjectID(studentId)
        })

        if(!student) {
          throw new Error('Student not found')
        }

         student = await db.students.findOneAndUpdate(
          {
            _id: new ObjectID(studentId),
          },
          {
            $push: {
              courses: new ObjectID(input)
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
    },

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
