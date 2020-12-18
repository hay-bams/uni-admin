// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { ObjectID } from 'mongodb';
import { connectDatabase } from '../src/database';
import { Course, Student } from '../src/lib/types';

export const students: Student[] = [
  {
    _id: new ObjectID('5fda72349baf026a892dc1a0'),
    studentID: 'ST17241',
    dob: 'Sunday Dec 16 1990 23:22:01 GMT+0100',
    status: 'active',
    name: 'Peace Dike',
    email: 'peace@gmail.com',
    country: 'Nigeria',
    courses: [
      new ObjectID('5fdab398791e134a5466566f'),
      new ObjectID('5fdab4c4fe1aa062abc46096'),
      new ObjectID('5fdab4ccba6dcf525408412a'),
    ],
    avatar: 'Some avatar',
  },
  {
    _id: new ObjectID('5fda72349baf026a892dc1a1'),
    studentID: 'ST10231',
    dob: 'Mon Feb 16 1987 23:22:01 GMT+0100',
    status: 'active',
    name: 'Ayobami Adelakun',
    email: 'purpose@gmail.com',
    country: 'Nigeria',
    courses: [
      new ObjectID('5fdab398791e134a5466566f'),
      new ObjectID('5fdab4b5eed1fb397feaca14'),
      new ObjectID('5fdab4bd78cc9321b31faf35'),
    ],
    avatar: 'Some avatar',
  },
  {
    _id: new ObjectID('5fda72349baf026a892dc1a2'),
    studentID: 'ST17241',
    dob: 'Sunday june 21 1992 23:22:01 GMT+0100',
    status: 'active',
    name: 'Suru Earnest',
    email: 'serihbrah@gmail.com',
    country: 'Nigeria',
    courses: [
      new ObjectID('5fdab4c4fe1aa062abc46096'),
      new ObjectID('5fdab4ccba6dcf525408412a'),
      new ObjectID('5fdab398791e134a5466566f'),
    ],
    avatar: 'Some avatar',
  },

  {
    _id: new ObjectID('5fdb8cb5f8274fba911d67b9'),
    studentID: 'ST17272',
    dob: 'Sunday june 21 1992 23:22:01 GMT+0100',
    status: 'active',
    name: 'Ayo Tunde',
    email: 'ayo@gmail.com',
    country: 'Nigeria',
    courses: [],
    avatar: 'Some avatar',
  },
];

export const courses: Course[] = [
  {
    _id: new ObjectID('5fdab398791e134a5466566f'),
    name: 'Aerospace Engineerng',
    category: 'Engineering',
    totalSeats: 25,
    status: 'active',
  },
  {
    _id: new ObjectID('5fdab4b5eed1fb397feaca14'),
    name: 'Fashion Technology',
    category: 'Fashion',
    totalSeats: 68,
    status: 'active',
  },
  {
    _id: new ObjectID('5fdab4bd78cc9321b31faf35'),
    name: 'Marine Engineerng',
    category: 'Ocean/Marine',
    totalSeats: 30,
    status: 'active',
  },
  {
    _id: new ObjectID('5fdab4c4fe1aa062abc46096'),
    name: 'Building, Contruction Management',
    category: 'Construction',
    totalSeats: 72,
    status: 'active',
  },
  {
    _id: new ObjectID('5fdab4ccba6dcf525408412a'),
    name: 'Agriculture',
    category: 'Agriculture',
    totalSeats: 74,
    status: 'active',
  },
];

const seed = async () => {
  console.log('seed is running...');
  const db = await connectDatabase();

  for (const student of students) {
    await db.students.insertOne(student);
  }

  for (const course of courses) {
    await db.courses.insertOne(course);
  }

  console.log('done!');
};

seed();
