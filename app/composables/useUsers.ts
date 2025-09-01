import { ref, computed, readonly } from 'vue'
import { z } from 'zod'
import { useToast } from './useToast'

// Zod schemas
export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'manager', 'user', 'viewer']),
  status: z.enum(['active', 'inactive', 'pending']),
  avatar: z.string().url().optional(),
  lastLogin: z.date().optional(),
})

export type User = z.infer<typeof userSchema>

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastLogin: new Date('2024-01-15T10:30:00Z'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'manager',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    lastLogin: new Date('2024-01-14T15:45:00Z'),
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastLogin: new Date('2024-01-13T09:20:00Z'),
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'viewer',
    status: 'inactive',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastLogin: new Date('2024-01-10T14:15:00Z'),
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'user',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    lastLogin: undefined,
  },
]

export const useUsers = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const users = ref<User[]>(mockUsers)
  const loading = ref(false)
  const searchQuery = ref('')
  const statusFilter = ref<string>('all')
  const roleFilter = ref<string>('all')

  // Computed properties
  const filteredUsers = computed(() => {
    return users.value.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        || user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesStatus = statusFilter.value === 'all' || user.status === statusFilter.value
      const matchesRole = roleFilter.value === 'all' || user.role === roleFilter.value

      return matchesSearch && matchesStatus && matchesRole
    })
  })

  const usersByRole = computed(() => {
    const grouped = users.value.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    return grouped
  })

  // CRUD operations
  const createUser = async (userData: Omit<User, 'id'>) => {
    const loadingToast = showLoading('Creating user...')

    try {
      // Validate data
      const validatedData = userSchema.parse(userData)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newUser: User = {
        ...validatedData,
        id: Date.now().toString(),
        lastLogin: undefined,
      }

      users.value.push(newUser)
      dismiss(loadingToast)
      showSuccess('User created successfully')

      return newUser
    }
    catch (error) {
      dismiss(loadingToast)
      showError('Failed to create user')
      throw error
    }
  }

  const updateUser = async (id: string, userData: Partial<User>) => {
    const loadingToast = showLoading('Updating user...')

    try {
      // Validate data
      const validatedData = userSchema.partial().parse(userData)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      const userIndex = users.value.findIndex(user => user.id === id)
      if (userIndex === -1) {
        throw new Error('User not found')
      }

      users.value[userIndex] = { ...users.value[userIndex], ...validatedData } as User
      dismiss(loadingToast)
      showSuccess('User updated successfully')

      return users.value[userIndex]
    }
    catch (error) {
      dismiss(loadingToast)
      showError('Failed to update user')
      throw error
    }
  }

  const deleteUser = async (id: string) => {
    const loadingToast = showLoading('Deleting user...')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600))

      const userIndex = users.value.findIndex(user => user.id === id)
      if (userIndex === -1) {
        throw new Error('User not found')
      }

      users.value.splice(userIndex, 1)
      dismiss(loadingToast)
      showSuccess('User deleted successfully')
    }
    catch (error) {
      dismiss(loadingToast)
      showError('Failed to delete user')
      throw error
    }
  }

  const getUserById = (id: string) => {
    return users.value.find(user => user.id === id)
  }

  return {
    users: readonly(users),
    filteredUsers,
    usersByRole,
    loading: readonly(loading),
    searchQuery,
    statusFilter,
    roleFilter,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
  }
}
