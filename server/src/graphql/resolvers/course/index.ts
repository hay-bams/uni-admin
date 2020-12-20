import { IResolvers } from "apollo-server-express";
import { Course } from "../../../lib/types";
import { ICtx } from "../students/types";

export const CourseResolver: IResolvers = {
  Query: {
    allCourses: async (_, __, ctx: ICtx): Promise<Course[]> => {
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