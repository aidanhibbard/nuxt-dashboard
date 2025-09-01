// https://www.shadcn-vue.com/docs/installation/nuxt.html#add-a-nuxt-plugin-for-providing-ssrwidth

import { provideSSRWidth } from '@vueuse/core'

export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp)
})
