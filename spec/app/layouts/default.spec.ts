import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DefaultLayout from '@/layouts/default.vue'

describe('layouts/default.vue', () => {
  it('renders header, sidebar and slots content', () => {
    const wrapper = mount(DefaultLayout, {
      slots: {
        default: '<div id="page-content">Hello</div>',
      },
    })

    // Sidebar component placeholder should exist via AppSidebar mount
    expect(wrapper.findComponent({ name: 'AppSidebar' }).exists()).toBe(true)
    // Header component placeholder should exist via AppHeader mount
    expect(wrapper.findComponent({ name: 'AppHeader' }).exists()).toBe(true)
    // Slot content rendered
    expect(wrapper.find('#page-content').text()).toBe('Hello')
  })

  it('matches snapshot', () => {
    const wrapper = mount(DefaultLayout, { slots: { default: '<div />' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
