<template>
  <q-page class="q-pa-md">
    <q-table title="Author overview" :rows="authorStore.getAuthorViewObjects" :columns="columns"
             row-key="name" flat bordered :grid="$q.screen.lt.sm" style="max-height: 76vh">
      <template v-slot:body-cell-actions="props">
        <q-td key="actions" :props="props" v-if="!$q.screen.xs">
          <q-btn icon="edit" :to="`/edit-author/${props.row.id}`" label="Edit" color="primary"
                 outline class="q-mr-md"/>
        </q-td>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
             :style="props.selected ? 'transform: scale(0.95);' : ''">
          <q-card>
            <q-card-section>
              <div class="text-h6">Name: {{ props.row.name }}</div>
              <div>Birth date: {{ props.row.birthDate }}</div>
              <div>books: {{ props.row.books }}</div>
            </q-card-section>

            <q-card-actions>
              <q-btn icon="edit" :to="`/edit-author/${props.row.id}`" label="Edit" color="primary"
                     outline class="q-mr-md"/>
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-table>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" to="/edit-author" color="primary"/>
    </q-page-sticky>
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

<style lang="scss">
.q-table__grid-content {
  overflow: scroll;
}
</style>
