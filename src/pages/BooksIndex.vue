<template>
  <q-page class="q-pa-md">
    <q-table title="Book overview" :rows="bookStore.getBookViewObjects" :columns="columns"
             row-key="name" flat bordered :grid="$q.screen.lt.sm" style="max-height: 76vh">
      <template v-slot:body-cell-actions="props">
        <q-td key="actions" :props="props">
          <q-btn icon="edit" :to="`/edit-book/${props.row.id}`" label="Edit" color="primary"
                 outline class="q-mr-md"/>
        </q-td>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
             :style="props.selected ? 'transform: scale(0.95);' : ''">
          <q-card>
            <q-card-section>
              <div class="text-h6">Title: {{ props.row.title }}</div>
              <div>Author: {{ props.row.author }}</div>
              <div>Year: {{ props.row.year }} €</div>
              <div>Price: {{ props.row.price }} €</div>
              <div>ISBN: {{ props.row.isbn }}</div>
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
      <q-btn fab icon="add" to="/edit-book" color="primary"/>
    </q-page-sticky>
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

<style lang="scss">
.q-table__grid-content {
  overflow: scroll;
}
</style>
