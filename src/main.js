import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router functions

// Import your components for routing
import LoginComponent from './components/LoginComponent.vue';
import RegisterComponent from './components/RegisterComponent.vue';

// Create a new router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: RegisterComponent },
    { path: '/login', component: LoginComponent }

  ]
});

// Create your Vue app
const app = createApp(App);

// Use the router instance
app.use(router);

// Mount the app
app.mount('#app');
