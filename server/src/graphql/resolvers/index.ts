import merge from 'lodash.merge';
import { StudentsResolver } from './students';
import { StudentResolver } from './student';
import { CourseResolver } from './course';
import { LoginResolver } from './login';
import { UserResolver } from './user';
import { RegisterResolver } from './register';


export const resolvers = merge(
  StudentsResolver,
  StudentResolver,
  CourseResolver,
  LoginResolver,
  UserResolver,
  RegisterResolver
);