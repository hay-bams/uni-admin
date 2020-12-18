import { ObjectID } from "mongodb";
import { Course, Database, Student } from "../lib/types";

export const curseExists = async (
  ids: string[],
  student: Student,
  db: Database
): Promise<Course | null> => {
  const courses = student.courses;
  const map = new Map();

  for (const course of courses) {
    map.set(course.toString(), course.toString());
  }

  for (const id of ids) {
    if (map.get(id)) {
      const course = await db.courses.findOne({
        _id: new ObjectID(map.get(id))
      })

      if(course) return course;
    }
  }
  return null;
};
