import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './styles/main.scss'; // если у вас есть стили

const app = createApp(App);

// Создаем экземпляр Pinia
const pinia = createPinia();

// Подключаем Pinia к приложению
app.use(pinia);

// Монтируем приложение
app.mount('#app');
