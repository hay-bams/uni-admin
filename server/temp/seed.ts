// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { ObjectID } from 'mongodb';
import { connectDatabase } from '../src/database';
import { Student } from '../src/lib/types';

export const students: Student[] = [
  {
    _id: new ObjectID('5fda72349baf026a892dc1a0'),
    studentID: 'ST17241',
    dob: 'Sunday Dec 16 1990 23:22:01 GMT+0100',
    status: 'active',
    name: 'Peace Dike',
    email: 'peace@gmail.com',
    country: 'Nigeria',
    avatar: 'Some avatar'
  },
  {
    _id: new ObjectID('5fda72349baf026a892dc1a1'),
    studentID: 'ST10231',
    dob: 'Mon Feb 16 1987 23:22:01 GMT+0100',
    status: 'active',
    name: 'Ayobami Adelakun',
    email: 'purpose@gmail.com',
    country: 'Nigeria',
    avatar: 'Some avatar'
  },
  {
    _id: new ObjectID('5fda72349baf026a892dc1a2'),
    studentID: 'ST17241',
    dob: 'Sunday june 21 1992 23:22:01 GMT+0100',
    status: 'active',
    name: 'Suru Earnest',
    email: 'serihbrah@gmail.com',
    country: 'Nigeria',
    avatar: 'Some avatar'
  }
]

const seed = async() => {
  console.log('seed is running...')
  const db = await connectDatabase()

  for (const student of students) {
    await db.students.insertOne(student)
  }

  console.log('done!')
}

seed()