import { MongoClient } from 'mongodb'
import { User } from '../graphql/resolvers/login/types';
import { Course, Database, Student } from '../lib/types';

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
