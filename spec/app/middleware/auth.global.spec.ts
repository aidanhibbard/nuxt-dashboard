import { describe, it, expect, vi, beforeEach } from 'vitest'
// Import middleware lazily after globals are stubbed in each test

vi.stubGlobal('navigateTo', vi.fn((path: string, opts?: { external?: boolean }) => ({ path, opts })))

// Simulate Nuxt auto-imports composable
const fetchMock = vi.fn(async () => {})
const loggedIn = { value: true }

vi.mock('#imports', async () => ({
  useUserSession: () => ({ loggedIn, fetch: fetchMock }),
}))

describe('middleware/auth.global', () => {
  beforeEach(() => {
    fetchMock.mockClear()
    ;(globalThis as Record<string, unknown>).useUserSession = () => ({ loggedIn, fetch: fetchMock })
    loggedIn.value = true
  })

  it('allows navigation when logged in', async () => {
    loggedIn.value = true
    const { default: authMiddleware } = await import('@/middleware/auth.global')
    const result = await (authMiddleware as (ctx?: unknown) => Promise<unknown>)()
    expect(fetchMock).toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('redirects to /auth/auth0 when not logged in', async () => {
    const navigateTo = (globalThis as Record<string, unknown>).navigateTo as ReturnType<typeof vi.fn>
    navigateTo.mockClear()
    loggedIn.value = false
    const { default: authMiddleware } = await import('@/middleware/auth.global')
    const result = await (authMiddleware as (ctx?: unknown) => Promise<unknown>)()
    expect(fetchMock).toHaveBeenCalled()
    expect(result).toEqual({ path: '/auth/auth0', opts: { external: true } })
  })
})
