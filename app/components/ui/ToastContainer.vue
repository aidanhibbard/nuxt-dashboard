<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { Alert, AlertDescription } from '@/components/shadcn/ui/alert'
import { Button } from '@/components/shadcn/ui/button'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Loader2 } from 'lucide-vue-next'

const { toasts, removeToast } = useToast()

const getToastIcon = (type: string) => {
  switch (type) {
    case 'success':
      return CheckCircle
    case 'error':
      return AlertCircle
    case 'warning':
      return AlertTriangle
    case 'info':
      return Info
    case 'loading':
      return Loader2
    default:
      return Info
  }
}

const getToastVariant = (type: string) => {
  switch (type) {
    case 'success':
      return 'default'
    case 'error':
      return 'destructive'
    case 'warning':
      return 'default'
    case 'info':
      return 'default'
    case 'loading':
      return 'default'
    default:
      return 'default'
  }
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup
      name="toast"
      tag="div"
      class="space-y-2"
    >
      <Alert
        v-for="toast in toasts"
        :key="toast.id"
        :variant="getToastVariant(toast.type)"
        class="w-80 shadow-lg border"
      >
        <div class="flex items-start gap-3">
          <component
            :is="getToastIcon(toast.type)"
            class="h-4 w-4 mt-0.5"
            :class="{
              'text-green-600': toast.type === 'success',
              'text-red-600': toast.type === 'error',
              'text-yellow-600': toast.type === 'warning',
              'text-blue-600': toast.type === 'info',
              'text-gray-600 animate-spin': toast.type === 'loading',
            }"
          />
          <AlertDescription class="flex-1">
            {{ toast.message }}
          </AlertDescription>
          <Button
            v-if="toast.type !== 'loading'"
            variant="ghost"
            size="sm"
            class="h-6 w-6 p-0"
            @click="removeToast(toast.id)"
          >
            <X class="h-3 w-3" />
          </Button>
        </div>
      </Alert>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
