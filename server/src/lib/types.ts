import { Request, Response } from 'express';
import { Collection, ObjectId, ObjectID } from 'mongodb';
export interface Course {
  _id: ObjectID;
  name: string;
  totalSeats: number;
  status: string;
}

export interface User {
  _id?: ObjectId;
  username?: string;
  password?: string
}

export interface Student {
  _id: ObjectID;
  studentID: string;
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


  
