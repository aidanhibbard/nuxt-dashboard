<script setup lang="ts">
import { useReports } from '@/composables/useReports'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Button } from '@/components/shadcn/ui/button'
import LineChart from '@/components/ui/LineChart.vue'
import { Input } from '@/components/shadcn/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select'
import { FileText, BarChart3, Plus, TrendingUp, Users, DollarSign, Activity } from 'lucide-vue-next'

const { filters, currentReport, reportSummary, generateReport } = useReports()

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const getReportIcon = (type: string) => {
  switch (type) {
    case 'users':
      return Users
    case 'revenue':
      return DollarSign
    case 'activity':
      return Activity
    case 'performance':
      return TrendingUp
    default:
      return FileText
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          Reports
        </h1>
        <p class="text-muted-foreground">
          Generate and manage analytical reports for your business.
        </p>
      </div>
      <Button>
        <Plus class="h-4 w-4 mr-2" />
        New Report
      </Button>
    </div>

    <!-- Report Generation -->
    <Card>
      <CardHeader>
        <CardTitle>Generate New Report</CardTitle>
        <CardDescription>
          Configure report parameters and generate custom analytics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-4">
          <div>
            <label class="text-sm font-medium">Start Date</label>
            <Input
              :value="new Date(filters.startDate).toISOString().slice(0, 10)"
              type="date"
              class="mt-1"
              @input="(e:any) => (filters.startDate = new Date((e.target as HTMLInputElement).value))"
            />
          </div>

          <div>
            <label class="text-sm font-medium">End Date</label>
            <Input
              :value="new Date(filters.endDate).toISOString().slice(0, 10)"
              type="date"
              class="mt-1"
              @input="(e:any) => (filters.endDate = new Date((e.target as HTMLInputElement).value))"
            />
          </div>

          <div>
            <label class="text-sm font-medium">Report Type</label>
            <Select
              v-model="filters.reportType"
              class="mt-1"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="users">
                  Users
                </SelectItem>
                <SelectItem value="revenue">
                  Revenue
                </SelectItem>
                <SelectItem value="activity">
                  Activity
                </SelectItem>
                <SelectItem value="performance">
                  Performance
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label class="text-sm font-medium">Group By</label>
            <Select
              v-model="filters.groupBy"
              class="mt-1"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select grouping" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">
                  Day
                </SelectItem>
                <SelectItem value="week">
                  Week
                </SelectItem>
                <SelectItem value="month">
                  Month
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <Button @click="generateReport(filters)">
            <BarChart3 class="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Current Report Display -->
    <div
      v-if="currentReport"
      class="grid gap-4 md:grid-cols-3"
    >
      <!-- Report Summary -->
      <Card class="col-span-1">
        <CardHeader>
          <CardTitle>Report Summary</CardTitle>
          <CardDescription>
            Key metrics from the current report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            v-if="reportSummary"
            class="space-y-4"
          >
            <div class="flex justify-between">
              <span class="text-sm text-muted-foreground">Total</span>
              <span class="font-medium">{{ reportSummary.total.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-muted-foreground">Average</span>
              <span class="font-medium">{{ reportSummary.average.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-muted-foreground">Maximum</span>
              <span class="font-medium">{{ reportSummary.max.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-muted-foreground">Minimum</span>
              <span class="font-medium">{{ reportSummary.min.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-muted-foreground">Data Points</span>
              <span class="font-medium">{{ reportSummary.count }}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Report Chart -->
      <Card class="col-span-2">
        <CardHeader>
          <CardTitle>{{ currentReport.title }}</CardTitle>
          <CardDescription>
            Generated on {{ formatDate(currentReport.generatedAt) }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
            <div class="text-center">
              <component
                :is="getReportIcon(currentReport.type)"
                class="h-12 w-12 text-muted-foreground mx-auto mb-2"
              />
              <p class="text-sm text-muted-foreground">
                Chart component will be added here
              </p>
              <p class="text-xs text-muted-foreground">
                {{ Array.isArray(currentReport.data) ? currentReport.data.length : 'Multiple' }} data points
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Simplified: Show charts instead of history -->
    <Card>
      <CardHeader>
        <CardTitle>
          Charts
        </CardTitle>
        <CardDescription>
          Visualize data for the selected date range
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 class="text-sm font-medium mb-2">
              Users
            </h3>
            <LineChart
              v-if="currentReport && currentReport.type === 'users' && Array.isArray(currentReport.data)"
              :labels="currentReport.data.map(d => d.label ?? d.date)"
              :datasets="[{ label: 'Users', data: currentReport.data.map(d => d.value), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.2)' }]"
            />
          </div>
          <div>
            <h3 class="text-sm font-medium mb-2">
              Revenue
            </h3>
            <LineChart
              v-if="currentReport && currentReport.type === 'revenue' && Array.isArray(currentReport.data)"
              :labels="currentReport.data.map(d => d.label ?? d.date)"
              :datasets="[{ label: 'Revenue', data: currentReport.data.map(d => d.value), borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.2)' }]"
            />
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Quick Report Templates -->
    <Card>
      <CardHeader>
        <CardTitle>Quick Report Templates</CardTitle>
        <CardDescription>
          Pre-configured report templates for common use cases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-4">
          <Button
            variant="outline"
            class="h-20 flex-col"
          >
            <Users class="h-6 w-6 mb-2" />
            <span class="text-sm">User Growth</span>
          </Button>
          <Button
            variant="outline"
            class="h-20 flex-col"
          >
            <DollarSign class="h-6 w-6 mb-2" />
            <span class="text-sm">Revenue Report</span>
          </Button>
          <Button
            variant="outline"
            class="h-20 flex-col"
          >
            <Activity class="h-6 w-6 mb-2" />
            <span class="text-sm">Activity Log</span>
          </Button>
          <Button
            variant="outline"
            class="h-20 flex-col"
          >
            <TrendingUp class="h-6 w-6 mb-2" />
            <span class="text-sm">Performance</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
