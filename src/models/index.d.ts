import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type AuthorMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BookMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Author {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly birthDate?: string | null;
  readonly books?: (Book | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Author, AuthorMetaData>);
  static copyOf(source: Author, mutator: (draft: MutableModel<Author, AuthorMetaData>) => MutableModel<Author, AuthorMetaData> | void): Author;
}

export declare class Book {
  readonly id: string;
  readonly title?: string | null;
  readonly year?: number | null;
  readonly price?: number | null;
  readonly isbn?: string | null;
  readonly authorID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Book, BookMetaData>);
  static copyOf(source: Book, mutator: (draft: MutableModel<Book, BookMetaData>) => MutableModel<Book, BookMetaData> | void): Book;
}