// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    'nuxt-authorization',
    'nuxt-auth-utils',
    'shadcn-nuxt',
    'nuxt-processor',
    '@prisma/nuxt',
  ],
  devtools: { enabled: true },
  css: ['~/assets/styles/tailwind.css'],
  compatibilityDate: '2025-08-30',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
      typescript: { strict: true },
    },
    checker: true,
  },
})
