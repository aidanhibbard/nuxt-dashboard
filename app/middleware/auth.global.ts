export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn, fetch } = useUserSession()

  await fetch()

  if (!loggedIn.value) {
    // Has to be external for redirect to work
    // return navigateTo('/auth/auth0', { external: true })
  }
})
