import { MongoClient } from 'mongodb'
import { Course, Database, Student } from '../lib/types';

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(`${process.env.MONGO_LOCAL_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(process.env.DATABASE);

  return {
    students: db.collection<Student>('student'),
    courses: db.collection<Course>('course')
  };
}; 
