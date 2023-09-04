import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

type AuthorMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BookMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerAuthor = {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly birthDate?: string | null;
  readonly books?: (Book | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAuthor = {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly birthDate?: string | null;
  readonly books: AsyncCollection<Book>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Author = LazyLoading extends LazyLoadingDisabled ? EagerAuthor : LazyAuthor

export declare const Author: (new (init: ModelInit<Author, AuthorMetaData>) => Author) & {
  copyOf(source: Author, mutator: (draft: MutableModel<Author, AuthorMetaData>) => MutableModel<Author, AuthorMetaData> | void): Author;
}

type EagerBook = {
  readonly id: string;
  readonly title?: string | null;
  readonly year?: number | null;
  readonly price?: number | null;
  readonly isbn?: string | null;
  readonly authorID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBook = {
  readonly id: string;
  readonly title?: string | null;
  readonly year?: number | null;
  readonly price?: number | null;
  readonly isbn?: string | null;
  readonly authorID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Book = LazyLoading extends LazyLoadingDisabled ? EagerBook : LazyBook

export declare const Book: (new (init: ModelInit<Book, BookMetaData>) => Book) & {
  copyOf(source: Book, mutator: (draft: MutableModel<Book, BookMetaData>) => MutableModel<Book, BookMetaData> | void): Book;
}