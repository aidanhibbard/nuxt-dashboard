<script setup lang="ts">
import { useReports } from '@/composables/useReports'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import LineChart from '@/components/ui/LineChart.vue'
import { Input } from '@/components/shadcn/ui/input'

const { filters, usersSeries, revenueSeries, activitySeries } = useReports()
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold tracking-tight">
        Reports
      </h1>
      <p class="text-muted-foreground">
        Analytics overview for your selected date range
      </p>
    </div>
    <!-- Inline Date Range Inputs -->
    <div class="flex flex-wrap items-center gap-3">
      <Input
        :value="new Date(filters.startDate).toISOString().slice(0, 10)"
        type="date"
        class="w-40"
        @input="(e:any) => (filters.startDate = new Date((e.target as HTMLInputElement).value))"
      />
      <Input
        :value="new Date(filters.endDate).toISOString().slice(0, 10)"
        type="date"
        class="w-40"
        @input="(e:any) => (filters.endDate = new Date((e.target as HTMLInputElement).value))"
      />
    </div>

    <!-- Charts -->
    <div class="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Daily new users</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            :labels="usersSeries.map(p => p.label ?? p.date)"
            :datasets="[{ label: 'New Users', data: usersSeries.map(p => p.value), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.2)' }]"
            :height="280"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Daily revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            :labels="revenueSeries.map(p => p.label ?? p.date)"
            :datasets="[{ label: 'Revenue', data: revenueSeries.map(p => p.value), borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.2)' }]"
            :height="280"
          />
        </CardContent>
      </Card>

      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle>Activity</CardTitle>
          <CardDescription>Events over time</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            :labels="activitySeries.map(p => p.label ?? p.date)"
            :datasets="[{ label: 'Events', data: activitySeries.map(p => p.value), borderColor: '#a855f7', backgroundColor: 'rgba(168,85,247,0.2)' }]"
            :height="300"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
