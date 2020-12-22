import { Request, Response } from 'express';
import { Collection, ObjectID } from 'mongodb';
import { User } from '../graphql/resolvers/login/types';

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
  courses: ObjectID[]
}

export interface Database {
  users: Collection<User>;
  students: Collection<Student>;
  courses: Collection<Course>
}

export interface ICtx {
  db: Database;
  req: Request;
  res: Response;
}
