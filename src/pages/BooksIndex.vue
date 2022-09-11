<template>
  <q-page class="q-pa-md">
    <p class="text-h3">Book overview</p>

    <q-btn icon="add" to="/edit-book" label="Add book" class="q-mb-md" color="primary"/>

    <q-table title="Books" :rows="props.books" :columns="columns" row-key="name" flat bordered>
      <template v-slot:body-cell-authorID="props">
        <q-td key="authorID" :props="props">{{ getAuthorName(props.row.authorID) }}</q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td key="actions" :props="props">
          <q-btn icon="edit" :to="`/edit-book/${props.row.id}`" label="Edit" color="primary"
                 outline class="q-mr-md"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { Author, Book } from 'src/models';

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

function getAuthorName(id: string) {
  return props.authors
    .filter((author) => author.id === id)
    .map((author) => `${author.lastName}, ${author.firstName}`)[0];
}
</script>
