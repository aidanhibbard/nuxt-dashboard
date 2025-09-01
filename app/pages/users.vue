<script setup lang="ts">
import { useUsers } from '@/composables/useUsers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Button } from '@/components/shadcn/ui/button'
import { Badge } from '@/components/shadcn/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table'
import { Users, MoreHorizontal, Edit, Eye, UserPlus } from 'lucide-vue-next'

const {
  filteredUsers,
} = useUsers()

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'inactive':
      return 'bg-red-100 text-red-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// roles removed

const formatDate = (date: Date | undefined) => {
  if (!date) return 'Never'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const getUserInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          Users
        </h1>
        <p class="text-muted-foreground">
          Manage your team members and their permissions.
        </p>
      </div>
      <Button>
        <UserPlus class="h-4 w-4 mr-2" />
        Add User
      </Button>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Total Users
          </CardTitle>
          <Users class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ filteredUsers.length }}
          </div>
          <p class="text-xs text-muted-foreground">
            Across all roles and statuses
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Active Users
          </CardTitle>
          <div class="h-4 w-4 rounded-full bg-green-500" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ filteredUsers.filter(u => u.status === 'active').length }}
          </div>
          <p class="text-xs text-muted-foreground">
            Currently active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Pending Users
          </CardTitle>
          <div class="h-4 w-4 rounded-full bg-yellow-500" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ filteredUsers.filter(u => u.status === 'pending').length }}
          </div>
          <p class="text-xs text-muted-foreground">
            Awaiting approval
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Inactive Users
          </CardTitle>
          <div class="h-4 w-4 rounded-full bg-red-500" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ filteredUsers.filter(u => u.status === 'inactive').length }}
          </div>
          <p class="text-xs text-muted-foreground">
            Deactivated accounts
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Filters removed per request -->

    <!-- Users Table -->
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          A list of all users in your system with their details and actions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>

              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead class="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="user in filteredUsers"
              :key="user.id"
              class="hover:bg-muted/50"
            >
              <TableCell>
                <div class="flex items-center space-x-3">
                  <Avatar class="h-8 w-8">
                    <AvatarImage
                      :src="user.avatar!"
                      :alt="user.name"
                    />
                    <AvatarFallback>{{ getUserInitials(user.name) }}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div class="font-medium">
                      {{ user.name }}
                    </div>
                    <div class="text-sm text-muted-foreground">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Badge :class="getStatusColor(user.status)">
                  {{ user.status }}
                </Badge>
              </TableCell>
              <TableCell>
                <span class="text-sm text-muted-foreground">
                  {{ formatDate(user.lastLogin) }}
                </span>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <Eye class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <Edit class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
