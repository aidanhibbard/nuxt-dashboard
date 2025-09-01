import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'

describe('pages/index.vue', () => {
  it('renders stats cards and recent orders', () => {
    const wrapper = mount(IndexPage)
    expect(wrapper.findAllComponents({ name: 'Card' }).length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain('Recent Orders')
  })

  it('renders the LineChart', () => {
    const wrapper = mount(IndexPage)
    expect(wrapper.find('.chart-line').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(IndexPage)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
