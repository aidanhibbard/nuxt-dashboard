import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import { useToast } from '@/composables/useToast'

describe('components/ui/ToastContainer.vue', () => {
  it('renders and dismisses toasts', async () => {
    const wrapper = mount(ToastContainer)
    const { showSuccess, removeToast } = useToast()
    const id = showSuccess('Saved successfully', 0)
    await wrapper.vm.$nextTick()
    // mount a second tick to allow reactive flush
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('Saved successfully')
    removeToast(id)
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).not.toContain('Saved successfully')
  })

  it('matches snapshot', () => {
    const wrapper = mount(ToastContainer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})


