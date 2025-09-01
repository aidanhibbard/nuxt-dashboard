import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import NavUser from '@/components/navigation/sidebar/NavUser.vue'

const stubs = {
  Avatar: { template: '<div class="avatar"><slot /></div>' },
  AvatarFallback: { template: '<div class="fallback"><slot /></div>' },
  AvatarImage: { template: '<img />' },
  DropdownMenu: { template: '<div><slot /></div>' },
  DropdownMenuContent: { template: '<div><slot /></div>' },
  DropdownMenuGroup: { template: '<div><slot /></div>' },
  DropdownMenuItem: { template: '<div><slot /></div>' },
  DropdownMenuLabel: { template: '<div><slot /></div>' },
  DropdownMenuSeparator: { template: '<hr />' },
  DropdownMenuTrigger: { template: '<div><slot /></div>' },
  SidebarMenu: { template: '<ul><slot /></ul>' },
  SidebarMenuButton: { template: '<button><slot /></button>' },
  SidebarMenuItem: { template: '<li><slot /></li>' },
}

// useSidebar is provided by setup file mock

describe('components/navigation/sidebar/NavUser.vue', () => {
  const user = { name: 'Alice', email: 'alice@example.com', avatar: '/alice.png' }

  it('renders user name and email', () => {
    const wrapper = mount(NavUser, { global: { stubs }, props: { user } })
    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('alice@example.com')
  })

  it('matches snapshot (desktop)', () => {
    ;(globalThis as any).__sidebarIsMobile = false
    const wrapper = mount(NavUser, { global: { stubs }, props: { user } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('changes dropdown side on mobile', () => {
    ;(globalThis as any).__sidebarIsMobile = true
    const wrapper = mount(NavUser, { global: { stubs }, props: { user } })
    expect(wrapper.find('[data-side="bottom"]').exists()).toBe(true)
  })
})


