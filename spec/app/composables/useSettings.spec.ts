import { describe, it, expect } from 'vitest'
import { useSettings } from '@/composables/useSettings'

describe('composables/useSettings', () => {
  it('updates profile and preferences', async () => {
    const s = useSettings()
    await s.updateProfile({ firstName: 'Test', lastName: 'User' })
    expect(s.fullName.value).toBe('Test User')
    await s.updatePreferences({ language: 'fr' })
    expect(s.preferences.value.language).toBe('fr')
  })
})


