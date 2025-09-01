<script setup lang="ts">
import type { SidebarProps } from '@/components/shadcn/ui/sidebar'

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
} from 'lucide-vue-next'
import NavMain from './NavMain.vue'
// Projects nav removed
import NavUser from './NavUser.vue'
import TeamSwitcher from './TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/shadcn/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: 'Users',
      url: '/users',
      icon: Users,
    },
    {
      title: 'Reports',
      url: '/reports',
      icon: FileText,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
  ],
  projects: [],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
