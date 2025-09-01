import { ref, computed, readonly } from 'vue'
import { useToast } from './useToast'

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  newUsers: number
  totalRevenue: number
  monthlyGrowth: number
  conversionRate: number
}

export interface RecentActivity {
  id: string
  type: 'user_created' | 'user_updated' | 'user_deleted' | 'login' | 'report_generated'
  message: string
  timestamp: Date
  user?: string
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
  }[]
}

export const useDashboard = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const loading = ref(false)
  const lastUpdated = ref(new Date())

  // Mock dashboard stats
  const stats = ref<DashboardStats>({
    totalUsers: 1247,
    activeUsers: 892,
    newUsers: 45,
    totalRevenue: 125000,
    monthlyGrowth: 12.5,
    conversionRate: 3.2,
  })

  // Mock recent activity
  const recentActivity = ref<RecentActivity[]>([
    {
      id: '1',
      type: 'user_created',
      message: 'New user registered',
      timestamp: new Date('2024-01-15T14:30:00Z'),
      user: 'john.doe@example.com',
    },
    {
      id: '2',
      type: 'login',
      message: 'User logged in',
      timestamp: new Date('2024-01-15T14:25:00Z'),
      user: 'jane.smith@example.com',
    },
    {
      id: '3',
      type: 'report_generated',
      message: 'Monthly report generated',
      timestamp: new Date('2024-01-15T14:20:00Z'),
      user: 'admin@example.com',
    },
    {
      id: '4',
      type: 'user_updated',
      message: 'User profile updated',
      timestamp: new Date('2024-01-15T14:15:00Z'),
      user: 'bob.johnson@example.com',
    },
    {
      id: '5',
      type: 'user_deleted',
      message: 'User account deleted',
      timestamp: new Date('2024-01-15T14:10:00Z'),
      user: 'inactive@example.com',
    },
  ])

  // Mock chart data
  const userGrowthData = ref<ChartData>({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 78, 90, 85, 95, 120],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  })

  const revenueData = ref<ChartData>({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 15000, 18000, 16000, 22000, 25000],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
      },
    ],
  })

  const userRoleDistribution = ref<ChartData>({
    labels: ['Admin', 'Manager', 'User', 'Viewer'],
    datasets: [
      {
        label: 'Users by Role',
        data: [5, 12, 45, 23],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
      },
    ],
  })

  // Computed properties
  const formattedStats = computed(() => ({
    totalUsers: stats.value.totalUsers.toLocaleString(),
    activeUsers: stats.value.activeUsers.toLocaleString(),
    newUsers: stats.value.newUsers.toLocaleString(),
    totalRevenue: `$${stats.value.totalRevenue.toLocaleString()}`,
    monthlyGrowth: `${stats.value.monthlyGrowth}%`,
    conversionRate: `${stats.value.conversionRate}%`,
  }))

  const activityByType = computed(() => {
    return recentActivity.value.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  })

  // Methods
  const refreshDashboard = async () => {
    const loadingToast = showLoading('Refreshing dashboard...')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Update mock data with slight variations
      stats.value = {
        totalUsers: stats.value.totalUsers + Math.floor(Math.random() * 10),
        activeUsers: stats.value.activeUsers + Math.floor(Math.random() * 5),
        newUsers: Math.floor(Math.random() * 20) + 30,
        totalRevenue: stats.value.totalRevenue + Math.floor(Math.random() * 5000),
        monthlyGrowth: stats.value.monthlyGrowth + (Math.random() - 0.5) * 2,
        conversionRate: stats.value.conversionRate + (Math.random() - 0.5) * 0.5,
      }

      lastUpdated.value = new Date()
      dismiss(loadingToast)
      showSuccess('Dashboard refreshed successfully')
    }
    catch {
      dismiss(loadingToast)
      showError('Failed to refresh dashboard')
    }
  }

  const addActivity = (activity: Omit<RecentActivity, 'id'>) => {
    const newActivity: RecentActivity = {
      ...activity,
      id: Date.now().toString(),
    }
    recentActivity.value.unshift(newActivity)

    // Keep only last 10 activities
    if (recentActivity.value.length > 10) {
      recentActivity.value = recentActivity.value.slice(0, 10)
    }
  }

  return {
    stats: readonly(stats),
    formattedStats,
    recentActivity: readonly(recentActivity),
    activityByType,
    userGrowthData: readonly(userGrowthData),
    revenueData: readonly(revenueData),
    userRoleDistribution: readonly(userRoleDistribution),
    loading: readonly(loading),
    lastUpdated: readonly(lastUpdated),
    refreshDashboard,
    addActivity,
  }
}
