// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Author, Book } = initSchema(schema);

export {
  Author,
  Book
};