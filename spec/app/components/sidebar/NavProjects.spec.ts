import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavProjects from '@/components/navigation/sidebar/NavProjects.vue'


describe('components/navigation/sidebar/NavProjects.vue', () => {
	it('renders project items and a More item', () => {
		const wrapper = mount(NavProjects, {
			props: {
				projects: [
					{ name: 'Design Engineering', url: '#', icon: { name: 'IconA' } as any },
					{ name: 'Sales & Marketing', url: '#', icon: { name: 'IconB' } as any },
				],
			},
		})

		expect(wrapper.text()).toContain('Projects')
		expect(wrapper.text()).toContain('Design Engineering')
		expect(wrapper.text()).toContain('Sales & Marketing')
		expect(wrapper.text()).toContain('More')
	})

	it('matches snapshot (desktop)', () => {
		;(globalThis as any).__sidebarIsMobile = false
		const wrapper = mount(NavProjects, {
			props: { projects: [
				{ name: 'Design Engineering', url: '#', icon: { name: 'IconA' } as any },
				{ name: 'Sales & Marketing', url: '#', icon: { name: 'IconB' } as any },
			] },
		})
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('updates dropdown alignment based on mobile state', async () => {
		;(globalThis as any).__sidebarIsMobile = true
		const wrapper = mount(NavProjects, {
			props: { projects: [ { name: 'Design Engineering', url: '#', icon: { name: 'IconA' } as any } ] },
		})
		expect(wrapper.find('[data-side="bottom"]').exists()).toBe(true)
		expect(wrapper.find('[data-align="end"]').exists()).toBe(true)
	})
})


