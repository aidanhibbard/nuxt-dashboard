<script setup lang="ts">
import { useSettings } from '@/composables/useSettings'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Button } from '@/components/shadcn/ui/button'
import { Badge } from '@/components/shadcn/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar'
import { Input } from '@/components/shadcn/ui/input'
import { Label } from '@/components/shadcn/ui/label'
import { Switch } from '@/components/shadcn/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import {
  User,
  Settings as SettingsIcon,
  Shield,
  Camera,
  Save,
  Download,
  Trash2,
  Moon,
  Sun,
  Monitor,
} from 'lucide-vue-next'

const {
  profile,
  preferences,
  fullName,
  initials,
  updateProfile,
  updatePreferences,
  changePassword,
  uploadAvatar,
  exportData,
  deleteAccount,
} = useSettings()

const handleAvatarUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadAvatar(target.files[0])
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          Settings
        </h1>
        <p class="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
    </div>

    <Tabs
      default-value="profile"
      class="space-y-6"
    >
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger
          value="profile"
          class="flex items-center gap-2"
        >
          <User class="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="preferences"
          class="flex items-center gap-2"
        >
          <SettingsIcon class="h-4 w-4" />
          Preferences
        </TabsTrigger>
        <TabsTrigger
          value="security"
          class="flex items-center gap-2"
        >
          <Shield class="h-4 w-4" />
          Security
        </TabsTrigger>
      </TabsList>

      <!-- Profile Tab -->
      <TabsContent
        value="profile"
        class="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and profile picture.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Avatar Section -->
            <div class="flex items-center space-x-6">
              <Avatar class="h-20 w-20">
                <AvatarImage
                  :src="profile.avatar!"
                  :alt="fullName"
                />
                <AvatarFallback class="text-lg">
                  {{ initials }}
                </AvatarFallback>
              </Avatar>
              <div class="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  as-child
                >
                  <label
                    for="avatar-upload"
                    class="cursor-pointer"
                  >
                    <Camera class="h-4 w-4 mr-2" />
                    Change Avatar
                  </label>
                </Button>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleAvatarUpload"
                >
                <p class="text-sm text-muted-foreground">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
            </div>

            <!-- Profile Form -->
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="firstName">First Name</Label>
                <Input
                  id="firstName"
                  v-model="profile.firstName"
                />
              </div>
              <div class="space-y-2">
                <Label for="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  v-model="profile.lastName"
                />
              </div>
              <div class="space-y-2 md:col-span-2">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  v-model="profile.email"
                  type="email"
                />
              </div>
            </div>

            <Button @click="updateProfile(profile)">
              <Save class="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Preferences Tab -->
      <TabsContent
        value="preferences"
        class="space-y-6"
      >
        <div class="grid gap-6 md:grid-cols-2">
          <!-- Appearance -->
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <Label>Theme</Label>
                <Select v-model="preferences.theme">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div class="flex items-center gap-2">
                        <Sun class="h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div class="flex items-center gap-2">
                        <Moon class="h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div class="flex items-center gap-2">
                        <Monitor class="h-4 w-4" />
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <Label>Language</Label>
                <Select v-model="preferences.language">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">
                      English
                    </SelectItem>
                    <SelectItem value="es">
                      Español
                    </SelectItem>
                    <SelectItem value="fr">
                      Français
                    </SelectItem>
                    <SelectItem value="de">
                      Deutsch
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <Label>Timezone</Label>
                <Select v-model="preferences.timezone">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">
                      Eastern Time
                    </SelectItem>
                    <SelectItem value="America/Chicago">
                      Central Time
                    </SelectItem>
                    <SelectItem value="America/Denver">
                      Mountain Time
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles">
                      Pacific Time
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      London
                    </SelectItem>
                    <SelectItem value="Europe/Paris">
                      Paris
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <!-- Notifications -->
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose how you want to be notified about updates.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p class="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch v-model="preferences.notifications.email" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p class="text-sm text-muted-foreground">
                    Receive push notifications in browser
                  </p>
                </div>
                <Switch v-model="preferences.notifications.push" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p class="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch v-model="preferences.notifications.sms" />
              </div>
            </CardContent>
          </Card>

          <!-- Dashboard Settings -->
          <Card class="md:col-span-2">
            <CardHeader>
              <CardTitle>Dashboard Settings</CardTitle>
              <CardDescription>
                Customize your dashboard experience.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid gap-4 md:grid-cols-2">
                <div class="space-y-2">
                  <Label>Default View</Label>
                  <Select v-model="preferences.dashboard.defaultView">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overview">
                        Overview
                      </SelectItem>
                      <SelectItem value="analytics">
                        Analytics
                      </SelectItem>
                      <SelectItem value="reports">
                        Reports
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div class="space-y-2">
                  <Label>Refresh Interval (seconds)</Label>
                  <Input
                    v-model="preferences.dashboard.refreshInterval"
                    type="number"
                    min="30"
                    max="3600"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>Show Charts</Label>
                  <p class="text-sm text-muted-foreground">
                    Display charts on dashboard
                  </p>
                </div>
                <Switch v-model="preferences.dashboard.showCharts" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>Show Activity Feed</Label>
                  <p class="text-sm text-muted-foreground">
                    Display recent activity on dashboard
                  </p>
                </div>
                <Switch v-model="preferences.dashboard.showActivity" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div class="flex justify-end">
          <Button @click="updatePreferences(preferences)">
            <Save class="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </TabsContent>

      <!-- Security Tab -->
      <TabsContent
        value="security"
        class="space-y-6"
      >
        <div class="grid gap-6 md:grid-cols-2">
          <!-- Change Password -->
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <Label for="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                />
              </div>
              <div class="space-y-2">
                <Label for="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                />
              </div>
              <div class="space-y-2">
                <Label for="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                />
              </div>
              <Button
                @click="changePassword({
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: '',
                })"
              >
                <Shield class="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </CardContent>
          </Card>

          <!-- Account Actions -->
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>
                Manage your account data and settings.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <Button
                variant="outline"
                class="w-full"
                @click="exportData"
              >
                <Download class="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button
                variant="destructive"
                class="w-full"
                @click="deleteAccount('DELETE')"
              >
                <Trash2 class="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>

        <!-- Security Info -->
        <Card>
          <CardHeader>
            <CardTitle>Security Information</CardTitle>
            <CardDescription>
              Important security details about your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-4 md:grid-cols-3">
              <div class="space-y-2">
                <Label class="text-sm font-medium">Last Login</Label>
                <p class="text-sm text-muted-foreground">
                  Today at 2:30 PM
                </p>
              </div>
              <div class="space-y-2">
                <Label class="text-sm font-medium">Account Created</Label>
                <p class="text-sm text-muted-foreground">
                  January 15, 2024
                </p>
              </div>
              <div class="space-y-2">
                <Label class="text-sm font-medium">Two-Factor Auth</Label>
                <Badge variant="secondary">
                  Not Enabled
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
