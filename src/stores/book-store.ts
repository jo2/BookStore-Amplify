import { defineStore } from 'pinia';
import { Book } from 'components/models';

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [
      {
        id: '1',
        title: 'Book 1',
        author: 'Author 1',
        year: 2012,
        price: 10.0,
      },
      {
        id: '2',
        title: 'Book 2',
        author: 'Author 1',
        year: 2017,
        price: 12.0,
      },
      {
        id: '3',
        title: 'Book 3',
        author: 'Author 2',
        year: 2015,
        price: 17.0,
      },
    ] as Array<Book>,
  }),
  getters: {
    getBooks: (state) => state.books,
    getBookById: (state) => (bookId: string) => (state.books.find((b) => {
      // eslint-disable-next-line no-console
      console.log(b);
      return b.id === bookId;
    }) as Book),
  },
  actions: {
    addBook(book: Book) {
      this.books.push(book);
    },
    updateBook(book: Book) {
      // eslint-disable-next-line no-console
      console.log(book);
      this.books.filter((b) => b.id === book.id).forEach((b) => {
        b.title = book.title;
        b.author = book.author;
        b.year = book.year;
        b.price = book.price;
      });
    },
    removeBook(bookId: string) {
      this.books = this.books.filter((b) => b.id !== bookId);
    },
    clear() {
      this.books = [];
    },
  },
});
