// https://nuxt.com/modules/authorization#example-with-nuxt-auth-utils

export default defineNuxtPlugin({
  name: 'authorization-resolver',
  parallel: true,
  setup() {
    return {
      provide: {
        authorization: {
          resolveClientUser: () => useUserSession().user.value,
        },
      },
    }
  },
})
