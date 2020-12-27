// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { ObjectID } from 'mongodb';
import { connectDatabase } from '../src/database';
import { Course, Student, User } from '../src/lib/types';


export const students: Student[] = [
  {
    _id: new ObjectID('5fda72349baf026a892dc1a0'),
    studentID: 'ST17241',
    status: 'active',
    name: 'Peace Dike',
    email: 'peace@gmail.com',
    country: 'Nigeria',
    courses: [
      new ObjectID('5fdab398791e134a5466566f'),
      new ObjectID('5fdab4c4fe1aa062abc46096'),
      new ObjectID('5fdab4ccba6dcf525408412a'),
    ],
  },
  {
    _id: new ObjectID('5fda72349baf026a892dc1a1'),
    studentID: 'ST10231',
    status: 'active',
    name: 'Ayobami Adelakun',
    email: 'purpose@gmail.com',
    country: 'Nigeria',
    courses: [
      new ObjectID('5fdab398791e134a5466566f'),
      new ObjectID('5fdab4b5eed1fb397feaca14'),
      new ObjectID('5fdab4bd78cc9321b31faf35'),
    ],
  },
  {
    _id: new ObjectID('5fda72349baf026a892dc1a2'),
    studentID: 'ST17241',
    status: 'active',
    name: 'Suru Earnest',
    email: 'serihbrah@gmail.com',
    country: 'Nigeria',
    courses: [
      new ObjectID('5fdab4c4fe1aa062abc46096'),
      new ObjectID('5fdab4ccba6dcf525408412a'),
      new ObjectID('5fdab398791e134a5466566f'),
    ],
  },

  {
    _id: new ObjectID('5fe093c1cc904952cae24eaf'),
    studentID: 'ST17282',
    status: 'active',
    name: 'Ayo Tunde',
    email: 'ayo@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe08ed7f2ef537672fdf08f'),
    studentID: 'ST17283',
    status: 'active',
    name: 'Chigo Dike',
    email: 'chigo@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe08f00cd16a801484b0bd9'),
    studentID: 'ST17284',
    status: 'active',
    name: 'Godstime Dike',
    email: 'Godstime@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe08f31e2bf7c2c59dc8f88'),
    studentID: 'ST17285',
    status: 'active',
    name: 'Emmanuel Dike',
    email: 'emma@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fdb8cb5f8274fba911d67b9'),
    studentID: 'ST17286',
    status: 'active',
    name: 'Ayo Tunde',
    email: 'ayo@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe08f6189e0c50f4cdae4c4'),
    studentID: 'ST17287',
    status: 'active',
    name: 'Naomi Dikcson',
    email: 'naomi@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe08ffcb3b328b32ab10dd9'),
    studentID: 'ST17288',
    status: 'active',
    name: 'John Derby',
    email: 'johnd@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe0901baad203942c049971'),
    studentID: 'ST17289',
    status: 'active',
    name: 'Selah Mana',
    email: 'selah@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe09073800f00f7ae0e3a07'),
    studentID: 'ST17290',
    status: 'active',
    name: 'Shola Ayede',
    email: 'sholaye@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe090b79d39c8b46e49c449'),
    studentID: 'ST17291',
    status: 'active',
    name: 'Ayo Dele',
    email: 'ayodele@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe090d54b3b7413d1b74571'),
    studentID: 'ST17292',
    status: 'active',
    name: 'Clementine Don',
    email: 'clem@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe090ff244d3ffe4bfbe4d3'),
    studentID: 'ST17293',
    status: 'active',
    name: 'Murphy Eke',
    email: 'Meke@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
];

export const courses: Course[] = [
  {
    _id: new ObjectID('5fdab398791e134a5466566f'),
    name: 'Aerospace Engineerng',
    totalSeats: 25,
    status: 'active',
  },
  {
    _id: new ObjectID('5fdab4b5eed1fb397feaca14'),
    name: 'Fashion Technology',
    totalSeats: 68,
    status: 'active',
  },
  {
    _id: new ObjectID('5fdab4bd78cc9321b31faf35'),
    name: 'Marine Engineerng',
    totalSeats: 30,
    status: 'active',
  },
  {
    _id: new ObjectID('5fdab4c4fe1aa062abc46096'),
    name: 'Building, Contruction Management',
    totalSeats: 72,
    status: 'active',
  },
  {
    _id: new ObjectID('5fdab4ccba6dcf525408412a'),
    name: 'Agriculture',
    totalSeats: 74,
    status: 'active',
  },
  {
    _id: new ObjectID('5fe08dd235c106dc089477fc'),
    name: 'Finance',
    totalSeats: 100,
    status: 'active',
  },
  {
    _id: new ObjectID('5fe08df239930550a3170d6a'),
    name: 'Accounting',
    totalSeats: 150,
    status: 'active',
  },
  {
    _id: new ObjectID('5fe08e09a2072af1e25d1ee2'),
    name: 'Cost Accounting',
    totalSeats: 100,
    status: 'active',
  },
  {
    _id: new ObjectID('5fe08e1da2a07b139ee54fa1'),
    name: 'Taxation',
    totalSeats: 80,
    status: 'active',
  },
  {
    _id: new ObjectID('5fe08e30a3c62fb02b7c112e'),
    name: 'Algorithms and Data Structures',
    totalSeats: 50,
    status: 'active',
  },
  {
    _id: new ObjectID('5fe08e4ee4689d745ca634c8'),
    name: 'Theory of Computation',
    totalSeats: 65,
    status: 'active',
  },
  {
    _id: new ObjectID('5fe08e6e543885bf92d95f19'),
    name: 'Programming Languages',
    totalSeats: 40,
    status: 'active',
  },
  {
    _id: new ObjectID('5fe08e904540b3208e7e61a3'),
    name: 'Discrete Mathematics',
    totalSeats: 70,
    status: 'active',
  },
  {
    _id: new ObjectID('5fe08eab6869f2dc638edf0e'),
    name: 'Design Patterns',
    totalSeats: 30,
    status: 'active',
  },
];

export const users: User[] = [
  {
    _id: new ObjectID('5fe09161251c8b0a9565108d'),
    username: 'admin',
    password: '$2y$10$PW4LHqyYIk3MgG6DS8Ww6.ai4nLCNJziWN2.ROB/RpbXh4Vtq08Ey',
  },
];

const seed = async () => {
  try {
    console.log('seed is running...');

    const db = await connectDatabase();

    for (const student of students) {
      await db.students.insertOne(student);
    }

    for (const course of courses) {
      await db.courses.insertOne(course);
    }

    for (const user of users) {
      await db.users.insertOne(user);
    }

    console.log('done!');
  } catch (err) {
    throw new Error(`Failed to seed database: ${err}`);
  }
};

seed();


// {
//   "studentID": "ST17241",
//   "dob": "Sunday Dec 16 1990 23:22:01 GMT+0100",
//   "status": "active",
//   "name": "Peace Dike",
//   "email": "peace@gmail.com",
//   "country": "Nigeria",
//   "courses": []
// }