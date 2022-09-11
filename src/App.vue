<template>
  <q-layout view="lHh Lpr lFf">
    <authenticator>
      <template v-slot:header>
        <q-header elevated>
          <q-toolbar>
            <q-toolbar-title>
              Book store
            </q-toolbar-title>
          </q-toolbar>
        </q-header>
      </template>

      <template v-slot="{ user, signOut }">
        <q-header elevated>
          <q-toolbar>
            <q-toolbar-title>
              Book store
            </q-toolbar-title>

            <div>
              <span class="q-mr-md">{{ getName(user) }}</span>
              <q-btn flat @click="signOut">Sign Out</q-btn>
            </div>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <Suspense>
            <router-view :books="books" :authors="authors"/>
          </Suspense>
        </q-page-container>

        <q-footer class="q-gutter-y-md">
          <q-tabs dense>
            <q-route-tab icon="menu_book" label="Books" @click="toBooks">
              <q-badge v-if="newBooks !== 0" color="red" floating>{{ newBooks }}</q-badge>
            </q-route-tab>
            <q-route-tab icon="school" label="Authors" @click="toAuthors">
              <q-badge v-if="newAuthors !== 0" color="red" floating>{{ newAuthors }}</q-badge>
            </q-route-tab>
          </q-tabs>
        </q-footer>
      </template>
    </authenticator>
  </q-layout>
</template>

<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import { Amplify } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Author, Book } from 'src/models';
import { onBeforeUnmount, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);

const router = useRouter();

const books: Ref<Array<Book>> = ref([]);
const newBooks: Ref<number> = ref(0);
const bookSubscription = DataStore.observeQuery(Book)
  .subscribe((snapshot) => {
    newBooks.value = Math.abs(snapshot.items.length - books.value.length);
    books.value = snapshot.items;
  });

const authors: Ref<Array<Author>> = ref([]);
const newAuthors: Ref<number> = ref(0);
const authorSubscription = DataStore.observeQuery(Author)
  .subscribe((snapshot) => {
    newAuthors.value = Math.abs(snapshot.items.length - authors.value.length);
    authors.value = snapshot.items;
  });

function getName(user: any) {
  return `${user.signInUserSession.idToken.payload.family_name}, ${user.signInUserSession.idToken.payload.given_name}`;
}

function toBooks() {
  newBooks.value = 0;
  router.push('/books');
}

function toAuthors() {
  newAuthors.value = 0;
  router.push('/authors');
}

onBeforeUnmount(() => {
  authorSubscription.unsubscribe();
  bookSubscription.unsubscribe();
});
</script>

<style lang="scss">
//div[data-amplify-authenticator] {
//  margin-top: 150px;
//  margin-bottom: -150px;
//}

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
