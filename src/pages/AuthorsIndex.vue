<template>
  <q-page class="q-pa-md">
    <p class="text-h3">Author overview</p>

    <q-btn icon="add" to="/edit-author" label="Add author" class="q-mb-md" color="primary"/>

    <q-table title="Authors" :rows="props.authors" :columns="columns" row-key="name" flat bordered>
      <template v-slot:body-cell-actions="props">
        <q-td key="actions" :props="props">
          <q-btn icon="edit" :to="`/edit-author/${props.row.id}`" label="Edit" color="primary"
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
    name: 'firstName',
    field: 'firstName',
    label: 'First name',
    sortable: true,
  },
  {
    name: 'lastName',
    field: 'lastName',
    label: 'Last name',
    sortable: true,
  },
  {
    name: 'birthDate',
    field: 'birthDate',
    label: 'Birth date',
    sortable: true,
  },
  {
    name: 'actions',
    filed: 'actions',
    label: 'Actions',
  },
];
</script>
