import { vi } from 'vitest'

// Mock Sidebar context and components to avoid injection errors
vi.mock('@/components/shadcn/ui/sidebar', async () => {
  (globalThis as any).__sidebarIsMobile = false
  const comps = {
    Sidebar: { name: 'Sidebar', template: '<aside><slot /></aside>' },
    SidebarContent: { name: 'SidebarContent', template: '<section><slot /></section>' },
    SidebarFooter: { name: 'SidebarFooter', template: '<footer><slot /></footer>' },
    SidebarHeader: { name: 'SidebarHeader', template: '<header><slot /></header>' },
    SidebarInset: { name: 'SidebarInset', template: '<div><slot /></div>' },
    SidebarMenu: { name: 'SidebarMenu', template: '<ul><slot /></ul>' },
    SidebarMenuAction: { name: 'SidebarMenuAction', template: '<button><slot /></button>' },
    SidebarMenuBadge: { name: 'SidebarMenuBadge', template: '<span><slot /></span>' },
    SidebarMenuButton: { name: 'SidebarMenuButton', template: '<button><slot /></button>' },
    SidebarMenuButtonChild: { name: 'SidebarMenuButtonChild', template: '<button><slot /></button>' },
    SidebarMenuItem: { name: 'SidebarMenuItem', template: '<li><slot /></li>' },
    SidebarMenuSkeleton: { name: 'SidebarMenuSkeleton', template: '<div />' },
    SidebarMenuSub: { name: 'SidebarMenuSub', template: '<ul><slot /></ul>' },
    SidebarMenuSubButton: { name: 'SidebarMenuSubButton', template: '<button><slot /></button>' },
    SidebarMenuSubItem: { name: 'SidebarMenuSubItem', template: '<li><slot /></li>' },
    SidebarProvider: { name: 'SidebarProvider', template: '<div><slot /></div>' },
    SidebarRail: { name: 'SidebarRail', template: '<div class="rail" />' },
    SidebarSeparator: { name: 'SidebarSeparator', template: '<hr />' },
    SidebarTrigger: { name: 'SidebarTrigger', template: '<button class="sidebar-trigger" />' },
    SidebarGroup: { name: 'SidebarGroup', template: '<div><slot /></div>' },
    SidebarGroupAction: { name: 'SidebarGroupAction', template: '<button><slot /></button>' },
    SidebarGroupContent: { name: 'SidebarGroupContent', template: '<div><slot /></div>' },
    SidebarGroupLabel: { name: 'SidebarGroupLabel', template: '<div><slot /></div>' },
    SidebarHeaderItem: { name: 'SidebarHeaderItem', template: '<div><slot /></div>' },
    SidebarInsetItem: { name: 'SidebarInsetItem', template: '<div><slot /></div>' },
    SidebarInput: { name: 'SidebarInput', template: '<input />' },
    useSidebar: () => ({ isMobile: (globalThis as any).__sidebarIsMobile }),
  }
  return comps as any
})

// Mock Dropdown and other primitives we use in tests
vi.mock('@/components/shadcn/ui/dropdown-menu', async () => {
  return {
    DropdownMenu: { template: '<div><slot /></div>' },
    DropdownMenuContent: { props: ['side', 'align'], template: '<div :data-side="side" :data-align="align"><slot /></div>' },
    DropdownMenuGroup: { template: '<div><slot /></div>' },
    DropdownMenuItem: { template: '<div class="dropdown-menu-item" @click="$emit(\'click\')"><slot /></div>' },
    DropdownMenuLabel: { template: '<div><slot /></div>' },
    DropdownMenuSeparator: { template: '<hr />' },
    DropdownMenuShortcut: { template: '<kbd><slot /></kbd>' },
    DropdownMenuTrigger: { template: '<div><slot /></div>' },
  } as any
})

vi.mock('@/components/shadcn/ui/collapsible', async () => {
  return {
    Collapsible: { template: '<div><slot /></div>' },
    CollapsibleContent: { template: '<div><slot /></div>' },
    CollapsibleTrigger: { template: '<div><slot /></div>' },
  } as any
})

vi.mock('@/components/shadcn/ui/breadcrumb', async () => {
  return {
    Breadcrumb: { template: '<nav class="breadcrumb"><slot /></nav>' },
    BreadcrumbList: { template: '<ul><slot /></ul>' },
    BreadcrumbItem: { template: '<li><slot /></li>' },
    BreadcrumbLink: { template: '<a><slot /></a>' },
    BreadcrumbSeparator: { template: '<span>|</span>' },
    BreadcrumbPage: { template: '<span class="page"><slot /></span>' },
  } as any
})

vi.mock('@/components/shadcn/ui/separator', async () => ({
  Separator: { template: '<hr />' },
}))

vi.mock('@/components/shadcn/ui/avatar', async () => ({
  Avatar: { template: '<div class="avatar"><slot /></div>' },
  AvatarFallback: { template: '<div class="fallback"><slot /></div>' },
  AvatarImage: { template: '<img />' },
}))

// Mock Nuxt middleware helper
// Returns the original handler function so it can be invoked directly in tests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).defineNuxtRouteMiddleware = (fn: any) => fn
