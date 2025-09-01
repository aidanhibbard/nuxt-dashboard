import { describe, it, expect } from 'vitest'
import { useUsers } from '@/composables/useUsers'

describe('composables/useUsers', () => {
  it('filters users and supports CRUD', async () => {
    const u = useUsers()
    const count = u.users.value.length
    const newUser = await u.createUser({ name: 'Alice Test', email: 'alice@test.com', role: 'user', status: 'active', avatar: undefined, lastLogin: undefined })
    expect(u.users.value.length).toBe(count + 1)
    await u.updateUser(newUser.id!, { name: 'Alice Updated' })
    expect(u.getUserById(newUser.id!)?.name).toBe('Alice Updated')
    await u.deleteUser(newUser.id!)
    expect(u.getUserById(newUser.id!)).toBeUndefined()
  })
})


