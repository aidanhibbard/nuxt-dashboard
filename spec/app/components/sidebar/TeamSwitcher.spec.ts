import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TeamSwitcher from '@/components/navigation/sidebar/TeamSwitcher.vue'

const stubs = {
  DropdownMenu: { template: '<div><slot /></div>' },
  DropdownMenuContent: { template: '<div><slot /></div>' },
  DropdownMenuItem: { template: '<div class="dm-item" @click="$emit(\'click\')"><slot /></div>' },
  DropdownMenuLabel: { template: '<div><slot /></div>' },
  DropdownMenuSeparator: { template: '<hr />' },
  DropdownMenuShortcut: { template: '<kbd><slot /></kbd>' },
  DropdownMenuTrigger: { template: '<div><slot /></div>' },
  SidebarMenu: { template: '<ul><slot /></ul>' },
  SidebarMenuButton: { template: '<button><slot /></button>' },
  SidebarMenuItem: { template: '<li><slot /></li>' },
}

describe('components/navigation/sidebar/TeamSwitcher.vue', () => {
  const teams = [
    { name: 'Acme Inc', logo: { name: 'LogoA' } as any, plan: 'Enterprise' },
    { name: 'Acme Corp', logo: { name: 'LogoB' } as any, plan: 'Free' },
  ]

  it('renders the active team name', () => {
    const wrapper = mount(TeamSwitcher, { global: { stubs }, props: { teams } })
    expect(wrapper.text()).toContain('Acme Inc')
    expect(wrapper.text()).toContain('Enterprise')
  })

  it('matches snapshot', () => {
    const wrapper = mount(TeamSwitcher, { global: { stubs }, props: { teams } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('changes active team on click', async () => {
    const wrapper = mount(TeamSwitcher, { global: { stubs }, props: { teams } })
    const items = wrapper.findAll('.dropdown-menu-item')
    // Click second item
    await items[1].trigger('click')
    expect(wrapper.text()).toContain('Acme Corp')
  })
})


