import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '@/components/navigation/header/AppHeader.vue'


describe('components/navigation/header/AppHeader.vue', () => {
	it('renders breadcrumb and sidebar trigger', () => {
		const wrapper = mount(AppHeader)
		expect(wrapper.find('.sidebar-trigger').exists()).toBe(true)
		expect(wrapper.find('.breadcrumb').exists()).toBe(true)
		expect(wrapper.text()).toContain('Building Your Application')
		expect(wrapper.text()).toContain('Data Fetching')
	})

	it('matches snapshot', () => {
		const wrapper = mount(AppHeader)
		expect(wrapper.html()).toMatchSnapshot()
	})
})


