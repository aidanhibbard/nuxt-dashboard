import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'

describe('pages/index.vue', () => {
  it('renders three aspect-video cards', () => {
    const wrapper = mount(IndexPage)
    const cards = wrapper.findAll('.aspect-video')
    expect(cards).toHaveLength(3)
  })

  it('matches snapshot', () => {
    const wrapper = mount(IndexPage)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
