import { ref, computed, readonly } from 'vue'
import { z } from 'zod'
import { useToast } from './useToast'

// Zod schemas
export const reportFiltersSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  reportType: z.enum(['users', 'revenue', 'activity', 'performance']),
  groupBy: z.enum(['day', 'week', 'month']).optional(),
})

export type ReportFilters = z.infer<typeof reportFiltersSchema>

export interface ReportData {
  id: string
  type: string
  title: string
  data: unknown
  generatedAt: Date
  filters: ReportFilters
}

export interface ChartDataPoint {
  date: string
  value: number
  label?: string
}

export const useReports = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const loading = ref(false)
  const filters = ref<ReportFilters>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date(),
    reportType: 'users',
    groupBy: 'day',
  })

  // Mock report data
  const reports = ref<ReportData[]>([])
  const currentReport = ref<ReportData | null>(null)

  // Mock chart data generators
  const generateUserData = (startDate: Date, endDate: Date, groupBy: string = 'day') => {
    const data: ChartDataPoint[] = []
    const current = new Date(startDate)

    while (current <= endDate) {
      data.push({
        date: current.toISOString().split('T')[0]!,
        value: Math.floor(Math.random() * 100) + 50,
        label: current.toLocaleDateString(),
      })

      if (groupBy === 'day') {
        current.setDate(current.getDate() + 1)
      }
      else if (groupBy === 'week') {
        current.setDate(current.getDate() + 7)
      }
      else {
        current.setMonth(current.getMonth() + 1)
      }
    }

    return data
  }

  const generateRevenueData = (startDate: Date, endDate: Date, groupBy: string = 'day') => {
    const data: ChartDataPoint[] = []
    const current = new Date(startDate)

    while (current <= endDate) {
      data.push({
        date: current.toISOString().split('T')[0]!,
        value: Math.floor(Math.random() * 10000) + 5000,
        label: current.toLocaleDateString(),
      })

      if (groupBy === 'day') {
        current.setDate(current.getDate() + 1)
      }
      else if (groupBy === 'week') {
        current.setDate(current.getDate() + 7)
      }
      else {
        current.setMonth(current.getMonth() + 1)
      }
    }

    return data
  }

  const generateActivityData = (startDate: Date, endDate: Date, groupBy: string = 'day') => {
    const data: ChartDataPoint[] = []
    const current = new Date(startDate)

    while (current <= endDate) {
      data.push({
        date: current.toISOString().split('T')[0]!,
        value: Math.floor(Math.random() * 500) + 100,
        label: current.toLocaleDateString(),
      })

      if (groupBy === 'day') {
        current.setDate(current.getDate() + 1)
      }
      else if (groupBy === 'week') {
        current.setDate(current.getDate() + 7)
      }
      else {
        current.setMonth(current.getMonth() + 1)
      }
    }

    return data
  }

  // Computed properties
  const filteredReports = computed(() => {
    return reports.value.filter((report) => {
      const matchesType = (
        filters.value.reportType === undefined
        || filters.value.reportType === null
        || report.type === filters.value.reportType
      )
      const matchesDateRange = (
        report.generatedAt >= filters.value.startDate
        && report.generatedAt <= filters.value.endDate
      )
      return matchesType && matchesDateRange
    })
  })

  const reportSummary = computed(() => {
    if (!currentReport.value) return null

    const data = currentReport.value.data
    if (Array.isArray(data)) {
      const total = data.reduce((sum, item) => sum + item.value, 0)
      const average = total / data.length
      const max = Math.max(...data.map(item => item.value))
      const min = Math.min(...data.map(item => item.value))

      return {
        total,
        average: Math.round(average * 100) / 100,
        max,
        min,
        count: data.length,
      }
    }

    return null
  })

  // Methods
  const generateReport = async (reportFilters: ReportFilters) => {
    const loadingToast = showLoading('Generating report...')

    try {
      // Validate filters
      const validatedFilters = reportFiltersSchema.parse(reportFilters)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      let reportData: unknown

      switch (validatedFilters.reportType) {
        case 'users':
          reportData = generateUserData(validatedFilters.startDate, validatedFilters.endDate, validatedFilters.groupBy)
          break
        case 'revenue':
          reportData = generateRevenueData(validatedFilters.startDate, validatedFilters.endDate, validatedFilters.groupBy)
          break
        case 'activity':
          reportData = generateActivityData(validatedFilters.startDate, validatedFilters.endDate, validatedFilters.groupBy)
          break
        case 'performance':
          reportData = {
            users: generateUserData(validatedFilters.startDate, validatedFilters.endDate, validatedFilters.groupBy),
            revenue: generateRevenueData(validatedFilters.startDate, validatedFilters.endDate, validatedFilters.groupBy),
          }
          break
      }

      const newReport: ReportData = {
        id: Date.now().toString(),
        type: validatedFilters.reportType,
        title: `${validatedFilters.reportType.charAt(0).toUpperCase() + validatedFilters.reportType.slice(1)} Report`,
        data: reportData,
        generatedAt: new Date(),
        filters: validatedFilters,
      }

      reports.value.unshift(newReport)
      currentReport.value = newReport
      filters.value = validatedFilters

      dismiss(loadingToast)
      showSuccess('Report generated successfully')

      return newReport
    }
    catch (error) {
      dismiss(loadingToast)
      if (error instanceof z.ZodError) {
        showError(error.errors[0]?.message ?? 'Validation error')
      }
      else {
        showError('Failed to generate report')
      }
      throw error
    }
  }

  const exportReport = async (reportId: string, format: 'csv' | 'json' | 'pdf' = 'csv') => {
    const loadingToast = showLoading(`Exporting report as ${format.toUpperCase()}...`)

    try {
      const report = reports.value.find(r => r.id === reportId)
      if (!report) {
        throw new Error('Report not found')
      }

      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500))

      dismiss(loadingToast)
      showSuccess(`Report exported as ${format.toUpperCase()} successfully`)

      // In a real app, this would trigger a download
      console.log(`Exporting report ${reportId} as ${format}`, report.data)
    }
    catch {
      dismiss(loadingToast)
      showError('Failed to export report')
    }
  }

  const deleteReport = async (reportId: string) => {
    const loadingToast = showLoading('Deleting report...')

    try {
      const reportIndex = reports.value.findIndex(r => r.id === reportId)
      if (reportIndex === -1) {
        throw new Error('Report not found')
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      reports.value.splice(reportIndex, 1)

      if (currentReport.value?.id === reportId) {
        currentReport.value = null
      }

      dismiss(loadingToast)
      showSuccess('Report deleted successfully')
    }
    catch {
      dismiss(loadingToast)
      showError('Failed to delete report')
    }
  }

  const setCurrentReport = (reportId: string) => {
    const report = reports.value.find(r => r.id === reportId)
    currentReport.value = report || null
  }

  return {
    filters,
    reports: readonly(reports),
    currentReport: readonly(currentReport),
    filteredReports,
    reportSummary,
    loading: readonly(loading),
    generateReport,
    exportReport,
    deleteReport,
    setCurrentReport,
  }
}
