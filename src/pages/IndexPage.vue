<template>
  <q-page class="q-pa-md">
    <p class="text-h3">Book overview</p>

    <q-btn icon="add" to="/edit-book" label="Add book" class="q-mb-md" color="primary"/>

    <q-table title="Books" :rows="store.getBooks" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td key="actions" :props="props">
          <q-btn icon="edit" :to="`/edit-book/${props.row.id}`" label="Edit" color="primary"
                 outline class="q-mr-md"/>

          <q-btn icon="delete" @click="() => store.removeBook(props.row.id)" label="Delete"
                 color="red"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useBookStore } from 'stores/book-store';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const store = useBookStore();

    const columns = [
      {
        name: 'title', field: 'title', label: 'Title', sortable: true,
      },
      {
        name: 'author', field: 'author', label: 'Author', sortable: true,
      },
      {
        name: 'year', field: 'year', label: 'Year', sortable: true,
      },
      {
        name: 'price', field: 'price', label: 'Price', sortable: true,
      },
      {
        name: 'actions', filed: 'actions', label: 'Actions',
      },
    ];

    return { columns, store };
  },
});
</script>
