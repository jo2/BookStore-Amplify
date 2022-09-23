<template>
  <q-page class="q-pa-md">
    <p class="text-h3">{{ book ? 'Edit book' : 'Create book' }}</p>

    <q-form @submit="saveBook" @reset="reset">
      <q-input outlined v-model="title" placeholder="Title of the book" label="Title"
               class="q-pb-lg" :rules="titleRules"/>

      <q-select :rules="authorRules" v-model="authorID" emit-value map-options
                :options="authorStore.getAuthorSelectOptions" outlined label="Author" />

      <q-input outlined v-model.number="year" placeholder="Year of the book" label="Year"
               class="q-pb-lg" :rules="yearRules" type="number"/>

      <q-input outlined v-model.number="price" mask="#.##" placeholder="Price of the book"
               label="Price" class="q-pb-lg" :rules="priceRules" type="number"/>

      <q-input outlined v-model="isbn" placeholder="ISBN of the book" label="ISBN"
               class="q-pb-lg" :rules="isbnRules"/>

      <div>
        <div v-if="book" class="q-mb-lg">
          <q-btn icon="delete" @click="deleteFlag = true" label="Delete" color="red"/>

          <q-dialog v-model="deleteFlag" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">Do you really want to delete the book {{ title }}?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" @click="deleteFlag = false"
                       v-close-popup/>

                <q-btn flat label="Delete" color="danger" @click="deleteBook"
                       v-close-popup/>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>

        <q-btn icon="save" label="Save" type="submit" color="primary" class="q-mr-md"/>

        <q-btn icon="close" label="Cancel" type="reset" color="red"/>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthorStore } from 'stores/author-store';
import { useBookStore } from 'stores/book-store';
import { Book } from '../models';

const authorStore = useAuthorStore();
const bookStore = useBookStore();
const route = useRoute();
const router = useRouter();

let book: Book;
const deleteFlag: Ref<boolean> = ref(false);

let title: Ref<string>;
let authorID: Ref<string>;
let year: Ref<number>;
let price: Ref<number>;
let isbn: Ref<string>;

const titleRules = [
  (val: string) => !!val || 'Title must not be empty',
  (val: string) => val.length >= 2 || 'Title must contain at least 2 characters',
];
const authorRules = [
  (val: string) => !!val || 'Author must not be empty',
];
const yearRules = [
  (val: number) => !!val || 'Year must not be empty',
  (val: number) => val >= 1000 || 'Year must be greater than or equal to 1000',
];
const priceRules = [
  (val: number) => !!val || 'Price must not be empty',
  (val: number) => val >= 1 || 'Price must be greater than or equal to 1',
];
const isbnRules = [
  (val: string) => !!val || 'ISBN must not be empty',
  (val: string) => (val.length === 10 || val.length === 13) || 'ISBN must contain 10 or 13 characters',
];

if (route.params.id) {
  book = bookStore.getBookById(route.params.id as string) as Book;
  title = book.title ? ref(book.title) : ref('');
  authorID = book.authorID ? ref(book.authorID) : ref('');
  price = book.price ? ref(book.price) : ref(0);
  year = book.year ? ref(book.year) : ref(new Date().getFullYear());
  isbn = book.isbn ? ref(book.isbn) : ref('');
} else {
  title = ref('');
  authorID = ref('');
  price = ref(0);
  year = ref(new Date().getFullYear());
  isbn = ref('');
}

async function saveBook() {
  if (book) {
    await bookStore.updateBook(Book.copyOf(book, (item) => {
      item.title = title.value;
      item.authorID = authorID.value;
      item.price = price.value;
      item.year = year.value;
      item.isbn = isbn.value;
    }));
  } else {
    await bookStore.createBook(new Book({
      title: title.value,
      authorID: authorID.value,
      price: price.value,
      year: year.value,
      isbn: isbn.value,
    }));
  }
  await router.push('/books');
}

async function reset() {
  await router.push('/books');
}

async function deleteBook() {
  if (book) {
    await bookStore.deleteBook(book);
    await router.push('/books');
  }
}
</script>
