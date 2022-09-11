<template>
  <q-page class="q-pa-md">
    <p class="text-h3">{{ author ? 'Edit author' : 'Create author' }}</p>

    <div v-if="author" class="q-mb-lg">
      <q-btn icon="delete" @click="deleteFlag = true" label="Delete" color="red"/>

      <q-dialog v-model="deleteFlag" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">
              Do you really want to delete the author {{ lastName }}, {{ firstName }}?
            </span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" @click="deleteFlag = false"
                   v-close-popup/>

            <q-btn flat label="Delete" color="red" @click="deleteAuthor"
                   v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div v-if="author" class="q-mb-lg">
      <q-table title="Books" :rows="books" :columns="columns" row-key="name" flat bordered>
        <template v-slot:body-cell-authorID="props">
          <q-td key="authorID" :props="props">{{ lastName }}, {{ firstName }}</q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td key="actions" :props="props">
            <q-btn icon="edit" :to="`/edit-book/${props.row.id}`" label="Edit" color="primary"
                   outline class="q-mr-md"/>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-form @submit="saveAuthor" @reset="reset">
      <q-input outlined v-model="firstName" placeholder="First name of the author"
               label="First name" class="q-pb-lg" :rules="firstNameRules"/>

      <q-input outlined v-model="lastName" placeholder="Last name of the auhtor" label="Last name"
               class="q-pb-lg" :rules="lastNameRules"/>

      <q-input outlined v-model="birthDate" mask="####-##-##" :rules="birthDateRules"
               class="q-pb-lg">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="birthDate" @input="() => $refs.qDateProxy.hide()" ></q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

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
    default: () => ([] as Array<Book>),
  },
  authors: {
    type: Array as () => Array<Author>,
    require: true,
    default: () => ([] as Array<Author>),
  },
});

const route = useRoute();
const router = useRouter();

let firstName: Ref<string>;
let lastName: Ref<string>;
let birthDate: Ref<string>;
const deleteFlag: Ref<boolean> = ref(false);
let author: Author | undefined;

const id: string = (route.params.id as string);
let books: Array<Book> = [];

const firstNameRules = [
  (val: string) => !!val || 'First name must not be empty',
  (val: string) => val.length >= 2 || 'First name must contain at least 2 characters',
];
const lastNameRules = [
  (val: string) => !!val || 'Last name must not be empty',
  (val: string) => val.length >= 2 || 'Last name must contain at least 2 characters',
];
const birthDateRules = [
  (val: string) => !!val || 'Birth date must not be empty',
  (val: string) => val.length >= 2 || 'Birth date must contain at least 2 characters',
];

if (id) {
  author = props.authors?.find((a) => a.id === id);
  if (!author) {
    author = await DataStore.query(Author, (route.params.id as string));
  }
  // eslint-disable-next-line no-console
  firstName = author?.firstName ? ref(author.firstName) : ref('');
  lastName = author?.lastName ? ref(author.lastName) : ref('');
  birthDate = author?.birthDate ? ref(author.birthDate) : ref('');
  books = props.books?.filter((b) => b.authorID === id);
} else {
  firstName = ref('');
  lastName = ref('');
  birthDate = ref('');
}

const columns = [
  {
    name: 'title',
    field: 'title',
    label: 'Title',
    sortable: true,
  },
  {
    name: 'authorID',
    field: 'authorID',
    label: 'Author',
    sortable: true,
  },
  {
    name: 'year',
    field: 'year',
    label: 'Year',
    sortable: true,
  },
  {
    name: 'price',
    field: 'price',
    label: 'Price',
    sortable: true,
  },
  {
    name: 'isbn',
    field: 'isbn',
    label: 'ISBN',
    sortable: true,
  },
  {
    name: 'actions',
    filed: 'actions',
    label: 'Actions',
  },
];

async function saveAuthor() {
  if (author) {
    await DataStore.save(Author.copyOf(author, (item) => {
      item.firstName = firstName.value;
      item.lastName = lastName.value;
      item.birthDate = birthDate.value;
    }));
  } else {
    await DataStore.save(
      new Author({
        firstName: firstName.value,
        lastName: lastName.value,
        birthDate: birthDate.value,
      }),
    );
  }
  await router.push('/authors');
}

async function reset() {
  await router.push('/authors');
}

async function deleteAuthor() {
  if (author) {
    await DataStore.delete(Book, (b) => b.authorID('eq', id));
    await DataStore.delete(author);
    await router.push('/authors');
  }
}
</script>
