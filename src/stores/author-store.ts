import { defineStore } from 'pinia';
import { Author } from 'src/models';
import { DataStore } from '@aws-amplify/datastore';
import { useBookStore } from 'stores/book-store';

export const useAuthorStore = defineStore('authors', {
  state: () => ({
    authors: [] as Array<Author>,
  }),
  getters: {
    getAuthors: (state) => state.authors,
    getAuthorViewObjects: (state) => state.authors.map((author) => ({
      id: author.id,
      name: `${author.lastName}, ${author.firstName}`,
      birthDate: author.birthDate,
      books: author.books?.length ? author.books.length : 0,
    })),
    getAuthorById: (state) => (authorId: string) => state.authors
      .find((author) => author.id === authorId),
    getAuthorNameById: (state) => (authorId: string) => state.authors
      .filter((author) => author.id === authorId)
      .map((author) => `${author.lastName}, ${author.firstName}`)
      .join(''),
    getAuthorSelectOptions: (state) => state.authors.map((author) => ({
      label: `${author.lastName}, ${author.firstName}`,
      value: author.id,
    })),
  },
  actions: {
    async createAuthor(author: Author) {
      const saved = await DataStore.save(
        new Author({
          firstName: author.firstName,
          lastName: author.lastName,
          birthDate: author.birthDate,
        }),
      );
      this.authors.push(saved);
    },
    async updateAuthor(author: Author) {
      const saved = await DataStore.save(Author.copyOf(author, (item) => {
        item.firstName = author.firstName;
        item.lastName = author.lastName;
        item.birthDate = author.birthDate;
      }));
      const authors = this.authors.filter((a) => a.id !== author.id);
      authors.push(saved);
      this.authors = authors;
    },
    updateStore(authors: Array<Author>) {
      authors.forEach((author) => {
        if (this.authors.map((a) => a.id).includes(author.id)) {
          const filtered = this.authors.filter((a) => a.id !== author.id);
          filtered.push(author);
          this.authors = filtered;
        } else {
          this.authors.push(author);
        }
      });
    },
    async deleteAuthor(author: Author) {
      const bookStore = useBookStore();
      await bookStore.deleteBooksByAuthorId(author.id);

      await DataStore.delete(author);
      this.authors = this.authors.filter((a) => a.id !== author.id);
    },
  },
});
