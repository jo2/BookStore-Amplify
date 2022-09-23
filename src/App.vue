<template>
  <q-layout view="lHh Lpr lFf">
    <!--<authenticator>
      <template v-slot:header>
        <q-header elevated>
          <q-toolbar>
            <q-toolbar-title>
              Book store
            </q-toolbar-title>
          </q-toolbar>
        </q-header>
      </template>

      <template v-slot="{ user, signOut }">-->
        <q-header elevated>
          <q-toolbar>
            <q-toolbar-title>
              Book store
            </q-toolbar-title>

            <div>
              <!--<span class="q-mr-md">{{ getName(user) }}</span>
              <q-btn flat @click="signOut">Sign Out</q-btn>-->
            </div>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <Suspense>
            <router-view/>
          </Suspense>
        </q-page-container>

        <q-footer class="q-gutter-y-md">
          <q-tabs dense>
            <q-route-tab icon="menu_book" label="Books" @click="toBooks"/>
            <q-route-tab icon="school" label="Authors" @click="toAuthors"/>
          </q-tabs>
        </q-footer>
      <!--</template>
    </authenticator>-->
  </q-layout>
</template>

<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import { Amplify } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Author, Book } from 'src/models';
import { onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthorStore } from 'stores/author-store';
import { useBookStore } from 'stores/book-store';
import awsConfig from './aws-exports.js';

Amplify.configure(awsConfig);

const authorStore = useAuthorStore();
const bookStore = useBookStore();
const router = useRouter();

const bookSubscription = DataStore.observeQuery(Book)
  .subscribe((snapshot) => {
    bookStore.updateStore(snapshot.items);
  });

const authorSubscription = DataStore.observeQuery(Author)
  .subscribe((snapshot) => {
    authorStore.updateStore(snapshot.items);
  });

function toBooks() {
  router.push('/books');
}

function toAuthors() {
  router.push('/authors');
}

onBeforeUnmount(() => {
  authorSubscription.unsubscribe();
  bookSubscription.unsubscribe();
});
</script>

<style lang="scss">
[data-amplify-authenticator] {
  display: flex;
  align-content: center;
  height: 100vh;
  justify-content: center;

  --amplify-components-button-primary-background-color: var(--q-primary);
  --amplify-components-button-primary-hover-background-color: var(--q-primary);
  --amplify-components-button-primary-focus-background-color: var(--q-primary);
  --amplify-components-button-primary-active-background-color: var(--q-primary);
  --amplify-components-button-link-color: var(--q-primary);
  --amplify-components-button-link-hover-color: var(--q-primary);
  --amplify-components-button-link-focus-color: var(--q-primary);
  --amplify-components-button-link-active-color: var(--q-primary);
  --amplify-components-tabs-border-color: var(--q-primary);

  --amplify-components-tabs-item-active-border-color: var(--q-primary);
  --amplify-components-tabs-item-active-color: var(--q-primary);
  --amplify-components-tabs-item-border-color: var(--q-primary);
  --amplify-components-tabs-item-color: var(--q-primary);
  --amplify-components-tabs-item-hover-color: var(--q-primary);
}
</style>
