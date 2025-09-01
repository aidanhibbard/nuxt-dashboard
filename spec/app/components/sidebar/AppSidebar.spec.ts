import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSidebar from '@/components/navigation/sidebar/AppSidebar.vue'

describe('components/navigation/sidebar/AppSidebar.vue', () => {
  it('renders TeamSwitcher, NavMain, NavProjects, NavUser', () => {
    const wrapper = mount(AppSidebar)

    expect(wrapper.findComponent({ name: 'TeamSwitcher' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'NavMain' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'NavProjects' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'NavUser' }).exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(AppSidebar)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
