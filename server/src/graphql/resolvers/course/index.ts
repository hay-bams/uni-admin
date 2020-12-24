import { IResolvers } from "apollo-server-express";
import { Course, ICtx } from "../../../lib/types";

export const CourseResolver: IResolvers = {
  Query: {
    allCourses: async (_, __, ctx: ICtx): Promise<Course[]> => {
            // TODO: Authorize before user can register course
      const { db } = ctx;

      const courses = await db.courses.find({})

      return courses.toArray()
    }
  },
  Course: {
    id: (course: Course): string => {
      return course._id.toString();
    },
  },
}