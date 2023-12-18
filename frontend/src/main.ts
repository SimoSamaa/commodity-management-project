import { createApp } from 'vue';
import App from '@/App.vue';
import route from '@/routes';
import store from '@/store/index';


import '@/scss/main-style.scss';

import BaseButton from '@/components/UI/BaseButton.vue';
import BaseModel from '@/components/UI/BaseModel.vue';
import BaseAlert from '@/components/UI/BaseAlert.vue';


const app = createApp(App)

app.component('base-button', BaseButton);
app.component('base-model', BaseModel);
app.component('BaseAlert', BaseAlert);


app.use(route);

app.use(store);

app.mount('#app');
