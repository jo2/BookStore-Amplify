<template>
  <q-page class="q-pa-md">
    <p class="text-h3">Author overview</p>

    <q-btn icon="add" to="/edit-author" label="Add author" class="q-mb-md" color="primary"/>

    <q-table title="Authors" :rows="authorStore.getAuthorViewObjects" :columns="columns"
             row-key="name" flat bordered :grid="$q.screen.lt.sm">
      <template v-slot:body-cell-actions="props">
        <q-td key="actions" :props="props" v-if="!$q.screen.xs">
          <q-btn icon="edit" :to="`/edit-author/${props.row.id}`" label="Edit" color="primary"
                 outline class="q-mr-md"/>
          <!-- TODO button not shown in mobile view -->
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthorStore } from 'stores/author-store';

const authorStore = useAuthorStore();

const columns = [
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    name: 'birthDate',
    field: 'birthDate',
    label: 'Birth date',
    sortable: true,
  },
  {
    name: 'books',
    field: 'books',
    label: 'Books',
    sortable: true,
  },
  {
    name: 'actions',
    filed: 'actions',
    label: 'Actions',
  },
];
</script>
