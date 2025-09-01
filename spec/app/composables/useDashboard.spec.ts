import { describe, it, expect } from 'vitest'
import { useDashboard } from '@/composables/useDashboard'

describe('composables/useDashboard', () => {
  it('exposes stats and recent orders', () => {
    const d = useDashboard()
    expect(d.stats.value.totalUsers).toBeGreaterThan(0)
    expect(d.recentOrders.value.length).toBeGreaterThan(0)
  })

  it('addActivity prepends activity', () => {
    const d = useDashboard()
    const initialFirst = d.recentActivity.value[0]?.id
    d.addActivity({ type: 'login', message: 'Test', timestamp: new Date() })
    expect(d.recentActivity.value[0]?.message).toBe('Test')
    if (initialFirst) expect(d.recentActivity.value[0]?.id).not.toBe(initialFirst)
  })
})


