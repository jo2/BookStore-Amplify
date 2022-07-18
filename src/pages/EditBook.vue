<template>
  <q-page class="q-pa-md">
    <p class="text-h3">{{ id ? 'Edit book' : 'Create book' }}</p>

    <q-form @submit="saveBook" @reset="reset">
      <q-input outlined v-model="title" placeholder="Title of the book" label="Title"
               class="q-pb-lg" :rules="titleRules" />

      <q-input outlined v-model="author" placeholder="Author of the book" label="Author"
               class="q-pb-lg" :rules="authorRules" />

      <q-input outlined v-model="year" placeholder="Year of the book" label="Year"
               class="q-pb-lg" :rules="yearRules" />

      <q-input outlined v-model="price" placeholder="Price of the book" label="Price"
               class="q-pb-lg" :rules="priceRules" />

      <div>
        <q-btn icon="save" label="Save" type="submit" color="primary" class="q-mr-md" />
        <q-btn icon="close" label="Cancel" type="reset" color="red" />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { Book } from 'components/models';
import { useBookStore } from 'stores/book-store';
import { v4 as uuidv4 } from 'uuid';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'EditBook',
  setup() {
    const $route = useRoute();
    const $store = useBookStore();
    const $router = useRouter();

    let title: Ref<string>;
    let author: Ref<string>;
    let year: Ref<number>;
    let price: Ref<number>;

    const titleRules = [
      (val: string) => !!val || 'Title must not be empty',
      (val: string) => val.length >= 2 || 'Title must contain at least 2 characters',
    ];
    const authorRules = [
      (val: string) => !!val || 'Author must not be empty',
      (val: string) => val.length >= 2 || 'Author must contain at least 2 characters',
    ];
    const yearRules = [
      (val: number) => !!val || 'Year must not be empty',
      (val: number) => val >= 1000 || 'Year must be greater than or equal to 1000',
    ];
    const priceRules = [
      (val: number) => !!val || 'Price must not be empty',
      (val: number) => val >= 1 || 'Price must be greater than or equal to 1',
    ];

    if ($route.params.id) {
      const book: Book = $store.getBookById($route.params.id as string);
      title = book?.title ? ref(book.title) : ref('');
      author = book?.author ? ref(book.author) : ref('');
      year = book?.year ? ref(book.year) : ref(0);
      price = book?.price ? ref(book.price) : ref(0);
    } else {
      title = ref('');
      author = ref('');
      year = ref(0);
      price = ref(0);
    }

    function saveBook() {
      // eslint-disable-next-line no-console
      console.log('submit');
      if ($route.params.id) {
        // eslint-disable-next-line no-console
        console.log(year.value);
        $store.updateBook(({
          id: $route.params.id,
          title: title.value,
          author: author.value,
          year: year.value,
          price: price.value,
        } as Book));
      } else {
        $store.addBook(({
          id: uuidv4(),
          title: title.value,
          author: author.value,
          year: year.value,
          price: price.value,
        } as Book));
      }
      $router.push('/');
    }

    function reset() {
      // eslint-disable-next-line no-console
      console.log('cancel');
      $router.push('/');
    }

    return {
      id: $route.params.id,
      title,
      titleRules,
      author,
      authorRules,
      year,
      yearRules,
      price,
      priceRules,
      saveBook,
      reset,
    };
  },
});
</script>
