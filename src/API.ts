/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAuthorInput = {
  id?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  birthDate?: string | null,
};

export type ModelAuthorConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  birthDate?: ModelStringInput | null,
  and?: Array< ModelAuthorConditionInput | null > | null,
  or?: Array< ModelAuthorConditionInput | null > | null,
  not?: ModelAuthorConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Author = {
  __typename: "Author",
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  birthDate?: string | null,
  books?: ModelBookConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelBookConnection = {
  __typename: "ModelBookConnection",
  items:  Array<Book | null >,
  nextToken?: string | null,
};

export type Book = {
  __typename: "Book",
  id: string,
  title?: string | null,
  year?: number | null,
  price?: number | null,
  isbn?: string | null,
  authorID: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAuthorInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  birthDate?: string | null,
};

export type DeleteAuthorInput = {
  id: string,
};

export type CreateBookInput = {
  id?: string | null,
  title?: string | null,
  year?: number | null,
  price?: number | null,
  isbn?: string | null,
  authorID: string,
};

export type ModelBookConditionInput = {
  title?: ModelStringInput | null,
  year?: ModelIntInput | null,
  price?: ModelFloatInput | null,
  isbn?: ModelStringInput | null,
  authorID?: ModelIDInput | null,
  and?: Array< ModelBookConditionInput | null > | null,
  or?: Array< ModelBookConditionInput | null > | null,
  not?: ModelBookConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateBookInput = {
  id: string,
  title?: string | null,
  year?: number | null,
  price?: number | null,
  isbn?: string | null,
  authorID?: string | null,
};

export type DeleteBookInput = {
  id: string,
};

export type ModelAuthorFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  birthDate?: ModelStringInput | null,
  and?: Array< ModelAuthorFilterInput | null > | null,
  or?: Array< ModelAuthorFilterInput | null > | null,
  not?: ModelAuthorFilterInput | null,
};

export type ModelAuthorConnection = {
  __typename: "ModelAuthorConnection",
  items:  Array<Author | null >,
  nextToken?: string | null,
};

export type ModelBookFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  year?: ModelIntInput | null,
  price?: ModelFloatInput | null,
  isbn?: ModelStringInput | null,
  authorID?: ModelIDInput | null,
  and?: Array< ModelBookFilterInput | null > | null,
  or?: Array< ModelBookFilterInput | null > | null,
  not?: ModelBookFilterInput | null,
};

export type ModelSubscriptionAuthorFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  birthDate?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAuthorFilterInput | null > | null,
  or?: Array< ModelSubscriptionAuthorFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBookFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  year?: ModelSubscriptionIntInput | null,
  price?: ModelSubscriptionFloatInput | null,
  isbn?: ModelSubscriptionStringInput | null,
  authorID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionBookFilterInput | null > | null,
  or?: Array< ModelSubscriptionBookFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateAuthorMutationVariables = {
  input: CreateAuthorInput,
  condition?: ModelAuthorConditionInput | null,
};

export type CreateAuthorMutation = {
  createAuthor?:  {
    __typename: "Author",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    birthDate?: string | null,
    books?:  {
      __typename: "ModelBookConnection",
      items:  Array< {
        __typename: "Book",
        id: string,
        title?: string | null,
        year?: number | null,
        price?: number | null,
        isbn?: string | null,
        authorID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAuthorMutationVariables = {
  input: UpdateAuthorInput,
  condition?: ModelAuthorConditionInput | null,
};

export type UpdateAuthorMutation = {
  updateAuthor?:  {
    __typename: "Author",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    birthDate?: string | null,
    books?:  {
      __typename: "ModelBookConnection",
      items:  Array< {
        __typename: "Book",
        id: string,
        title?: string | null,
        year?: number | null,
        price?: number | null,
        isbn?: string | null,
        authorID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAuthorMutationVariables = {
  input: DeleteAuthorInput,
  condition?: ModelAuthorConditionInput | null,
};

export type DeleteAuthorMutation = {
  deleteAuthor?:  {
    __typename: "Author",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    birthDate?: string | null,
    books?:  {
      __typename: "ModelBookConnection",
      items:  Array< {
        __typename: "Book",
        id: string,
        title?: string | null,
        year?: number | null,
        price?: number | null,
        isbn?: string | null,
        authorID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateBookMutationVariables = {
  input: CreateBookInput,
  condition?: ModelBookConditionInput | null,
};

export type CreateBookMutation = {
  createBook?:  {
    __typename: "Book",
    id: string,
    title?: string | null,
    year?: number | null,
    price?: number | null,
    isbn?: string | null,
    authorID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBookMutationVariables = {
  input: UpdateBookInput,
  condition?: ModelBookConditionInput | null,
};

export type UpdateBookMutation = {
  updateBook?:  {
    __typename: "Book",
    id: string,
    title?: string | null,
    year?: number | null,
    price?: number | null,
    isbn?: string | null,
    authorID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBookMutationVariables = {
  input: DeleteBookInput,
  condition?: ModelBookConditionInput | null,
};

export type DeleteBookMutation = {
  deleteBook?:  {
    __typename: "Book",
    id: string,
    title?: string | null,
    year?: number | null,
    price?: number | null,
    isbn?: string | null,
    authorID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetAuthorQueryVariables = {
  id: string,
};

export type GetAuthorQuery = {
  getAuthor?:  {
    __typename: "Author",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    birthDate?: string | null,
    books?:  {
      __typename: "ModelBookConnection",
      items:  Array< {
        __typename: "Book",
        id: string,
        title?: string | null,
        year?: number | null,
        price?: number | null,
        isbn?: string | null,
        authorID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAuthorsQueryVariables = {
  filter?: ModelAuthorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAuthorsQuery = {
  listAuthors?:  {
    __typename: "ModelAuthorConnection",
    items:  Array< {
      __typename: "Author",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      birthDate?: string | null,
      books?:  {
        __typename: "ModelBookConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBookQueryVariables = {
  id: string,
};

export type GetBookQuery = {
  getBook?:  {
    __typename: "Book",
    id: string,
    title?: string | null,
    year?: number | null,
    price?: number | null,
    isbn?: string | null,
    authorID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBooksQueryVariables = {
  filter?: ModelBookFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBooksQuery = {
  listBooks?:  {
    __typename: "ModelBookConnection",
    items:  Array< {
      __typename: "Book",
      id: string,
      title?: string | null,
      year?: number | null,
      price?: number | null,
      isbn?: string | null,
      authorID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateAuthorSubscriptionVariables = {
  filter?: ModelSubscriptionAuthorFilterInput | null,
};

export type OnCreateAuthorSubscription = {
  onCreateAuthor?:  {
    __typename: "Author",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    birthDate?: string | null,
    books?:  {
      __typename: "ModelBookConnection",
      items:  Array< {
        __typename: "Book",
        id: string,
        title?: string | null,
        year?: number | null,
        price?: number | null,
        isbn?: string | null,
        authorID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAuthorSubscriptionVariables = {
  filter?: ModelSubscriptionAuthorFilterInput | null,
};

export type OnUpdateAuthorSubscription = {
  onUpdateAuthor?:  {
    __typename: "Author",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    birthDate?: string | null,
    books?:  {
      __typename: "ModelBookConnection",
      items:  Array< {
        __typename: "Book",
        id: string,
        title?: string | null,
        year?: number | null,
        price?: number | null,
        isbn?: string | null,
        authorID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAuthorSubscriptionVariables = {
  filter?: ModelSubscriptionAuthorFilterInput | null,
};

export type OnDeleteAuthorSubscription = {
  onDeleteAuthor?:  {
    __typename: "Author",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    birthDate?: string | null,
    books?:  {
      __typename: "ModelBookConnection",
      items:  Array< {
        __typename: "Book",
        id: string,
        title?: string | null,
        year?: number | null,
        price?: number | null,
        isbn?: string | null,
        authorID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateBookSubscriptionVariables = {
  filter?: ModelSubscriptionBookFilterInput | null,
};

export type OnCreateBookSubscription = {
  onCreateBook?:  {
    __typename: "Book",
    id: string,
    title?: string | null,
    year?: number | null,
    price?: number | null,
    isbn?: string | null,
    authorID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBookSubscriptionVariables = {
  filter?: ModelSubscriptionBookFilterInput | null,
};

export type OnUpdateBookSubscription = {
  onUpdateBook?:  {
    __typename: "Book",
    id: string,
    title?: string | null,
    year?: number | null,
    price?: number | null,
    isbn?: string | null,
    authorID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBookSubscriptionVariables = {
  filter?: ModelSubscriptionBookFilterInput | null,
};

export type OnDeleteBookSubscription = {
  onDeleteBook?:  {
    __typename: "Book",
    id: string,
    title?: string | null,
    year?: number | null,
    price?: number | null,
    isbn?: string | null,
    authorID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
