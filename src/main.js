/** @format */
import { createApp } from 'vue'
// import VueCookies from "vue-cookies";
import App from './App.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseContainer from './components/UI/BaseContainer.vue'
import BaseIcon from './components/UI/icons/BaseIcon.vue'
import BaseTabs from './components/UI/BaseTabs.vue'
import Date from './components/utilities/Date.vue'
import BaseImage from './components/UI/BaseImage.vue'
import BasePopup from './components/UI/‌BasePopup.vue'
import BaseSpiner from './components/UI/BaseSpiner.vue'
import NotifItems from './components/UI/notificaiton/NotifItems.vue'

const app = createApp(App)
// add global components
app.component('base-button', BaseButton)
app.component('base-container', BaseContainer)
app.component('base-icon', BaseIcon)
app.component('base-tabs', BaseTabs)
app.component('base-image', BaseImage)
app.component('base-popup', BasePopup)
app.component('base-spiner', BaseSpiner)
app.component('notif-items', NotifItems)
app.component('date', Date)
import router from './router/index'
import store from './store/index'
app.use(router)
app.use(store)
// app.use(VueCookies);
app.mount('#app')
