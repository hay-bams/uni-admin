import { Collection, ObjectID } from "mongodb";

export interface Student {
  _id: ObjectID
  studentID: string;
  dob: string;
  status: string;
  name: string;
  email: string;
  country: string;
  avatar: string | null;
}

export interface Database {
  students: Collection<Student>
}