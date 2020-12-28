// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { connectDatabase } from '../src/database';

const clear = async () => {
  try {
    const db = await connectDatabase();

    console.log('[clear database] : running...');

    const users = await db.users.find({}).toArray();
    const students = await db.students.find({}).toArray();
    const courses = await db.courses.find({}).toArray();
 

    if (users.length > 0) {
      await db.users.drop();
    }

    if (students.length > 0) {
      await db.students.drop();
    }

    if (courses.length > 0) {
      await db.courses.drop();
    }

    console.log('[clear database] : success');
  } catch (err) {
    throw new Error('Failed to Clear Database');
  }
};

clear();
