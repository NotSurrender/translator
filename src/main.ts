import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'
import App from './App.vue'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'

import './assets/main.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(DialogService)
app.use(createPinia())

app.mount('#app')
