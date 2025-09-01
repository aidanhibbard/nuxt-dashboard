import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ReportsPage from '@/pages/reports.vue'

describe('pages/reports.vue', () => {
  it('renders inline date inputs and charts', () => {
    const wrapper = mount(ReportsPage)
    const inputs = wrapper.findAll('input[type="date"]')
    expect(inputs.length).toBe(2)
    // Three chart placeholders
    expect(wrapper.findAll('.chart-line').length).toBeGreaterThanOrEqual(3)
  })

  it('matches snapshot', () => {
    const wrapper = mount(ReportsPage)
    expect(wrapper.html()).toMatchSnapshot()
  })
})


