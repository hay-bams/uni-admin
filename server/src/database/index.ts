import { MongoClient } from 'mongodb'
import { Course, Database, Student, User } from '../lib/types';

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(`${process.env.MONGO_LOCAL_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(process.env.DB);

  return {
    users: db.collection<User>('user'),
    students: db.collection<Student>('student'),
    courses: db.collection<Course>('course'),
  };
}; 
