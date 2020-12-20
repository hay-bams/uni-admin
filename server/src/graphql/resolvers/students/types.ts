import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import { Course, Database, Student } from '../../../lib/types';

export interface StudentsArgs {
  all: string;
  page: number;
  limit: number;
}

export interface StudentArgs {
  id: string;
}

export interface StudentsData {
  total: number;
  results: Student[];
}

export interface StudentData {
  student: Student | null;
  courses: Course[] | null;
}