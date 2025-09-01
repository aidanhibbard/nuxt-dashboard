// https://nuxt.com/modules/authorization#example-with-nuxt-auth-utils

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    event.context.$authorization = {
      resolveServerUser: async () => {
        const session = await getUserSession(event)
        return session.user ?? null
      },
    }
  })
})
