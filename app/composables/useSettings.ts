import { ref, computed, readonly } from 'vue'
import { z } from 'zod'
import { useToast } from './useToast'

// Zod schemas
export const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  avatar: z.string().url().optional(),
})

export const preferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  language: z.enum(['en', 'es', 'fr', 'de']),
  timezone: z.string(),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
  dashboard: z.object({
    defaultView: z.enum(['overview', 'analytics', 'reports']),
    refreshInterval: z.number().min(30).max(3600),
    showCharts: z.boolean(),
    showActivity: z.boolean(),
  }),
})

export const securitySchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
})

export type Profile = z.infer<typeof profileSchema>
export type Preferences = z.infer<typeof preferencesSchema>
export type SecuritySettings = z.infer<typeof securitySchema>

export const useSettings = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const loading = ref(false)

  // Mock user profile
  const profile = ref<Profile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  })

  // Mock user preferences
  const preferences = ref<Preferences>({
    theme: 'system',
    language: 'en',
    timezone: 'America/New_York',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    dashboard: {
      defaultView: 'overview',
      refreshInterval: 300,
      showCharts: true,
      showActivity: true,
    },
  })

  // Computed properties
  const fullName = computed(() => {
    return `${profile.value.firstName} ${profile.value.lastName}`
  })

  const initials = computed(() => {
    return `${profile.value.firstName.charAt(0)}${profile.value.lastName.charAt(0)}`
  })

  const isDarkMode = computed(() => {
    if (preferences.value.theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return preferences.value.theme === 'dark'
  })

  // Methods
  const updateProfile = async (profileData: Partial<Profile>) => {
    const loadingToast = showLoading('Updating profile...')

    try {
      // Validate data
      const validatedData = profileSchema.partial().parse(profileData)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      Object.assign(profile.value, validatedData)

      dismiss(loadingToast)
      showSuccess('Profile updated successfully')

      return profile.value
    }
    catch (error) {
      dismiss(loadingToast)
      if (error instanceof z.ZodError) {
        showError(error.errors[0]?.message ?? 'Failed to update profile')
      }
      else {
        showError('Failed to update profile')
      }
      throw error
    }
  }

  const updatePreferences = async (preferencesData: Partial<Preferences>) => {
    const loadingToast = showLoading('Updating preferences...')

    try {
      // Validate data
      const validatedData = preferencesSchema.partial().parse(preferencesData)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      Object.assign(preferences.value, validatedData)

      // Apply theme changes immediately
      if (validatedData.theme) {
        applyTheme(validatedData.theme)
      }

      dismiss(loadingToast)
      showSuccess('Preferences updated successfully')

      return preferences.value
    }
    catch (error) {
      dismiss(loadingToast)
      if (error instanceof z.ZodError) {
        showError(error.errors[0]?.message ?? 'Validation error')
      }
      else {
        showError('Failed to update preferences')
      }
      throw error
    }
  }

  const changePassword = async (securityData: SecuritySettings) => {
    const loadingToast = showLoading('Changing password...')

    try {
      // Validate data
      const validatedData = securitySchema.parse(securityData)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200))

      dismiss(loadingToast)
      showSuccess('Password changed successfully')

      // In a real app, you would update the user's password here
      console.log('Password changed:', validatedData.newPassword)
    }
    catch (error) {
      dismiss(loadingToast)
      if (error instanceof z.ZodError) {
        showError(error.errors[0]?.message ?? 'Failed to change password')
      }
      else {
        showError('Failed to change password')
      }
      throw error
    }
  }

  const uploadAvatar = async (file: File) => {
    const loadingToast = showLoading('Uploading avatar...')

    try {
      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file')
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('File size must be less than 5MB')
      }

      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 1500))

      // In a real app, you would upload to a server and get back a URL
      const mockAvatarUrl = `https://images.unsplash.com/photo-${Date.now()}?w=150&h=150&fit=crop&crop=face`

      profile.value.avatar = mockAvatarUrl

      dismiss(loadingToast)
      showSuccess('Avatar uploaded successfully')

      return mockAvatarUrl
    }
    catch (error) {
      dismiss(loadingToast)
      showError(error instanceof Error ? error.message : 'Failed to upload avatar')
      throw error
    }
  }

  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    // In a real app, you would apply the theme to the document
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
  }

  const exportData = async () => {
    const loadingToast = showLoading('Exporting data...')

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))

      const exportData = {
        profile: profile.value,
        preferences: preferences.value,
        exportedAt: new Date().toISOString(),
      }

      dismiss(loadingToast)
      showSuccess('Data exported successfully')

      // In a real app, this would trigger a download
      console.log('Exporting data:', exportData)

      return exportData
    }
    catch (error) {
      dismiss(loadingToast)
      showError('Failed to export data')
      throw error
    }
  }

  const deleteAccount = async (confirmation: string) => {
    if (confirmation !== 'DELETE') {
      showError('Please type DELETE to confirm account deletion')
      return
    }

    const loadingToast = showLoading('Deleting account...')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))

      dismiss(loadingToast)
      showSuccess('Account deleted successfully')

      // In a real app, you would redirect to logout or home page
      console.log('Account deleted')
    }
    catch (error) {
      dismiss(loadingToast)
      showError('Failed to delete account')
      throw error
    }
  }

  return {
    profile: readonly(profile),
    preferences: readonly(preferences),
    fullName,
    initials,
    isDarkMode,
    loading: readonly(loading),
    updateProfile,
    updatePreferences,
    changePassword,
    uploadAvatar,
    applyTheme,
    exportData,
    deleteAccount,
  }
}
