import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LineChart from '@/components/ui/LineChart.vue'

describe('components/ui/LineChart.vue', () => {
  it('renders chart container', () => {
    const wrapper = mount(LineChart, {
      props: {
        labels: ['Jan', 'Feb'],
        datasets: [{ label: 'A', data: [1, 2] }],
        height: 200,
      },
    })
    expect(wrapper.find('.chart-line').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(LineChart, {
      props: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{ label: 'A', data: [1, 3, 2] }],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})


