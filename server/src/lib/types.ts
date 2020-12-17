import { Collection, ObjectID } from 'mongodb';

export interface Course {
  _id: ObjectID;
  name: string;
  category: string;
  totalSeats: number;
  status: string;
}

export interface Student {
  _id: ObjectID;
  studentID: string;
  dob: string;
  status: string;
  name: string;
  email: string;
  country: string;
  avatar: string | null;
  courses: ObjectID[]
}

export interface Database {
  students: Collection<Student>;
  courses: Collection<Course>
}
