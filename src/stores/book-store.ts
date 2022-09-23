import { defineStore } from 'pinia';
import { Book } from 'src/models';
import { DataStore } from '@aws-amplify/datastore';
import { useAuthorStore } from 'stores/author-store';

export const useBookStore = defineStore('books', {
  state: () => ({
    books: [] as Array<Book>,
  }),
  getters: {
    getBooks: (state) => state.books,
    getBookViewObjects: (state) => {
      const authorStore = useAuthorStore();

      return state.books.map((book) => ({
        id: book.id,
        title: book.title,
        year: book.year,
        isbn: book.isbn,
        price: book.price,
        authorID: authorStore.getAuthorNameById(book.authorID),
      }));
    },
    getBookById: (state) => (bookId: string) => state.books
      .find((book) => book.id === bookId),
    getBooksByAuthorId: (state) => (authorId: string) => state.books
      .filter((book) => book.authorID === authorId),
  },
  actions: {
    async createBook(book: Book) {
      const saved = await DataStore.save(
        new Book({
          title: book.title,
          year: book.year,
          isbn: book.isbn,
          price: book.price,
          authorID: book.authorID,
        }),
      );
      this.books.push(saved);
    },
    async updateBook(book: Book) {
      const saved = await DataStore.save(Book.copyOf(book, (item) => {
        item.title = book.title;
        item.year = book.year;
        item.isbn = book.isbn;
        item.price = book.price;
      }));
      const books = this.books.filter((a) => a.id !== book.id);
      books.push(saved);
      this.books = books;
    },
    updateStore(books: Array<Book>) {
      books.forEach((book) => {
        if (this.books.map((b) => b.id).includes(book.id)) {
          const filtered = this.books.filter((a) => a.id !== book.id);
          filtered.push(book);
          this.books = filtered;
        } else {
          this.books.push(book);
        }
      });
    },
    async deleteBooksByAuthorId(authorId: string) {
      await DataStore.delete(Book, (b) => b.authorID('eq', authorId));
      this.books = this.books.filter((b) => b.authorID !== authorId);
    },
    async deleteBook(book: Book) {
      await DataStore.delete(book);
      this.books = this.books.filter((a) => a.id !== book.id);
    },
  },
});
