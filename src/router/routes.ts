import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('pages/BooksIndex.vue'), props: true },
  { path: '/books', component: () => import('pages/BooksIndex.vue') },
  { path: '/edit-book/', component: () => import('pages/EditBook.vue') },
  { path: '/edit-book/:id', component: () => import('pages/EditBook.vue') },
  { path: '/authors', component: () => import('pages/AuthorsIndex.vue') },
  { path: '/edit-author/', component: () => import('pages/EditAuthor.vue') },
  { path: '/edit-author/:id', component: () => import('pages/EditAuthor.vue'), props: true },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
