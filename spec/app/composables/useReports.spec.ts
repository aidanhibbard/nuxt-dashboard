import { describe, it, expect } from 'vitest'
import { useReports } from '@/composables/useReports'

describe('composables/useReports', () => {
  it('exposes series based on date range', () => {
    const r = useReports()
    const usersPoints = r.usersSeries.value.length
    expect(usersPoints).toBeGreaterThan(0)
  })
})


