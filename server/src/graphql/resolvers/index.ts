import merge from 'lodash.merge';
import { StudentsResolver } from './students';
import { StudentResolver } from './student';
import { CourseResolver } from './course';

export const resolvers = merge(
  StudentsResolver,
  StudentResolver,
  CourseResolver
);
