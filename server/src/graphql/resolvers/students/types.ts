import { Request, Response } from 'express';
import { Database, Student } from '../../../lib/types';

export interface ICtx {
  db: Database;
  req: Request;
  res: Response;
}

export interface StudentArgs {
  all: string;
  page: number;
  limit: number;
}

export interface StudentData {
  total: number;
  results: Student[];
}
