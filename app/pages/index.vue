<script setup lang="ts">
import { useDashboard } from '@/composables/useDashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Users, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, UserCheck } from 'lucide-vue-next'
import LineChart from '@/components/ui/LineChart.vue'

const { formattedStats, userGrowthData, recentOrders } = useDashboard()
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p class="text-muted-foreground">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Total Users
          </CardTitle>
          <Users class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ formattedStats.totalUsers }}
          </div>
          <p class="text-xs text-muted-foreground">
            <span class="text-green-600 flex items-center">
              <ArrowUpRight class="h-3 w-3 mr-1" />
              +12.5%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Active Users
          </CardTitle>
          <UserCheck class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ formattedStats.activeUsers }}
          </div>
          <p class="text-xs text-muted-foreground">
            <span class="text-green-600 flex items-center">
              <ArrowUpRight class="h-3 w-3 mr-1" />
              +8.2%
            </span>
            from last week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Total Revenue
          </CardTitle>
          <DollarSign class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ formattedStats.totalRevenue }}
          </div>
          <p class="text-xs text-muted-foreground">
            <span class="text-green-600 flex items-center">
              <ArrowUpRight class="h-3 w-3 mr-1" />
              +{{ formattedStats.monthlyGrowth }}
            </span>
            from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Conversion Rate
          </CardTitle>
          <TrendingUp class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ formattedStats.conversionRate }}
          </div>
          <p class="text-xs text-muted-foreground">
            <span class="text-red-600 flex items-center">
              <ArrowDownRight class="h-3 w-3 mr-1" />
              -0.8%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Charts and Recent Orders -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <!-- User Growth Chart -->
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>
            New user registrations over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            :labels="[...userGrowthData.labels]"
            :datasets="userGrowthData.datasets.map(d => ({ ...d, data: [...d.data] }))"
            :height="320"
          />
        </CardContent>
      </Card>
      <!-- Recent Orders -->
      <Card class="col-span-3">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Latest transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="order in recentOrders.slice(0, 6)"
              :key="order.id"
              class="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
            >
              <div>
                <p class="text-sm font-medium">
                  {{ order.id }} — {{ order.customer }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ order.email }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium">
                  ${{ (order.totalCents / 100).toLocaleString() }}
                </p>
                <p
                  class="text-xs"
                  :class="{
                    'text-green-600': order.status === 'paid',
                    'text-yellow-600': order.status === 'pending',
                    'text-red-600': order.status === 'failed',
                  }"
                >
                  {{ order.status }}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
