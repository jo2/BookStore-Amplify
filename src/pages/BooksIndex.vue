<template>
  <q-page class="q-pa-md">
    <p class="text-h3">Book overview</p>

    <q-btn icon="add" to="/edit-book" label="Add book" class="q-mb-md" color="primary"/>

    <q-table title="Books" :rows="bookStore.getBookViewObjects" :columns="columns"
             row-key="name" flat bordered :grid="$q.screen.lt.sm">
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
import { useBookStore } from 'stores/book-store';

const bookStore = useBookStore();

const columns = [
  {
    name: 'title',
    field: 'title',
    label: 'Title',
    sortable: true,
  },
  {
    name: 'author',
    field: 'author',
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
</script>
