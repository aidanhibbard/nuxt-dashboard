import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavMain from '@/components/navigation/sidebar/NavMain.vue'

describe('components/navigation/sidebar/NavMain.vue', () => {
  it('renders nav items and subitems', () => {
    const wrapper = mount(NavMain, {
      props: {
        items: [
          {
            title: 'Playground',
            url: '#',
            isActive: true,
            items: [
              { title: 'History', url: '#' },
              { title: 'Settings', url: '#' },
            ],
          },
          {
            title: 'Models',
            url: '#',
            items: [
              { title: 'Genesis', url: '#' },
            ],
          },
        ],
      },
    })

    expect(wrapper.text()).toContain('Platform')
    expect(wrapper.text()).toContain('Playground')
    expect(wrapper.text()).toContain('Models')
    expect(wrapper.text()).toContain('History')
    expect(wrapper.text()).toContain('Settings')
    expect(wrapper.text()).toContain('Genesis')
  })

  it('matches snapshot', () => {
    const wrapper = mount(NavMain, {
      props: { items: [{ title: 'Playground', url: '#', isActive: true, items: [{ title: 'History', url: '#' }] }] },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
