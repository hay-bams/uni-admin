import { IResolvers } from "apollo-server-express";
import { Course } from "../../../lib/types";

export const CourseResolver: IResolvers = {
  Course: {
    id: (course: Course): string => {
      return course._id.toString();
    },
  },
}