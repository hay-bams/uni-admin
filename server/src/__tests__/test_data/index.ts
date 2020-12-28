import { ObjectID } from 'mongodb';

export const STUDENT_DATA = [
  {
    _id: new ObjectID('5fda72349baf026a892dc1a0'),
    studentID: 'ST17238',
    status: 'active',
    name: 'Peace Dike',
    email: 'peace@gmail.com',
    country: 'Nigeria',
    courses: ['5fe08e904540b3208e7e61a3'],
  },
  {
    _id: '5fe36133a29a42f8111cf29c',
    studentID: 'ST17239',
    status: 'active',
    name: 'Peace Tola',
    email: 'tola@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe3613b0818b75505901627'),
    studentID: 'ST17240',
    status: 'active',
    name: 'john doe',
    email: 'johnd@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
  {
    _id: new ObjectID('5fe3617932e06a4c602772d0'),
    studentID: 'ST17242',
    status: 'active',
    name: 'pemi ola',
    email: 'pemi@gmail.com',
    country: 'Nigeria',
    courses: [],
  },
];


export const COURSES_DATA = [
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
]


export const USER_DATA = [
  {
    _id: new ObjectID('5fe09161251c8b0a9565108d'),
    username: 'admin',
    password: '$2y$10$PW4LHqyYIk3MgG6DS8Ww6.ai4nLCNJziWN2.ROB/RpbXh4Vtq08Ey',
  },
];
