<template>
  <q-page class="q-pa-md">
    <p class="text-h3">{{ book ? 'Edit book' : 'Create book' }}</p>

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

    <q-form @submit="saveBook" @reset="reset">
      <q-input outlined v-model="title" placeholder="Title of the book" label="Title"
               class="q-pb-lg" :rules="titleRules"/>

      <q-select :rules="authorRules" v-model="author" :options="authors" outlined
                label="Author" emit-value map-options/>

      <q-input outlined v-model.number="year" placeholder="Year of the book" label="Year"
               class="q-pb-lg" :rules="yearRules" type="number"/>

      <q-input outlined v-model.number="price" mask="#.##" placeholder="Price of the book"
               label="Price" class="q-pb-lg" :rules="priceRules" type="number"/>

      <q-input outlined v-model="isbn" placeholder="ISBN of the book" label="ISBN" class="q-pb-lg"
               :rules="isbnRules"/>

      <div>
        <q-btn icon="save" label="Save" type="submit" color="primary" class="q-mr-md"/>

        <q-btn icon="close" label="Cancel" type="reset" color="red"/>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DataStore } from '@aws-amplify/datastore';
import { Author, Book } from '../models';

const props = defineProps({
  books: {
    type: Array as () => Array<Book>,
    require: true,
  },
  authors: {
    type: Array as () => Array<Author>,
    require: true,
    default: () => ([] as Array<Author>),
  },
});

let authors;
if (props.authors?.length > 0) {
  authors = props.authors?.map((author) => ({
    value: author.id,
    label: `${author.lastName}, ${author.firstName}`,
  }));
} else {
  authors = (await DataStore.query(Author)).map((author) => ({
    value: author.id,
    label: `${author.lastName}, ${author.firstName}`,
  }));
}

const route = useRoute();
const router = useRouter();

let title: Ref<string>;
let author: Ref<string|null>;
let year: Ref<number>;
let price: Ref<number>;
let isbn: Ref<string>;
const deleteFlag: Ref<boolean> = ref(false);
let book: Book | undefined;

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
  book = props.books?.find((b) => b.id === (route.params.id as string));
  if (!book) {
    book = await DataStore.query(Book, (route.params.id as string));
  }
  title = book?.title ? ref(book.title) : ref('');
  author = book?.authorID ? ref(book.authorID) : ref(null);
  year = book?.year ? ref(book.year) : ref(0);
  price = book?.price ? ref(book.price) : ref(0);
  isbn = book?.isbn ? ref(book.isbn) : ref('');
} else {
  title = ref('');
  author = ref(null);
  year = ref(0);
  price = ref(0);
  isbn = ref('');
}

async function saveBook() {
  if (book) {
    await DataStore.save(Book.copyOf(book, (item) => {
      item.title = title.value;
      item.price = (price.value as number);
      item.year = (year.value as number);
      item.isbn = isbn.value;
      item.authorID = author.value ? author.value : '';
    }));
  } else {
    await DataStore.save(
      new Book({
        title: title.value,
        year: (year.value as number),
        price: (price.value as number),
        isbn: isbn.value,
        authorID: author.value ? author.value : '',
      }),
    );
  }
  await router.push('/books');
}

async function reset() {
  await router.push('/books');
}

async function deleteBook() {
  if (book) {
    await DataStore.delete(book);
    await router.push('/books');
  }
}
</script>
