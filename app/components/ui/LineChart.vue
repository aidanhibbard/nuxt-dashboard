<script setup lang="ts">
import { computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type InputDataset = {
  label: string
  data: readonly number[]
  backgroundColor?: string | readonly string[]
  borderColor?: string | readonly string[]
}

type MutableDataset = {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string | string[]
}

const props = defineProps<{ labels: readonly string[], datasets: readonly InputDataset[], height?: number }>()

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: true } },
}

const chartData = computed<{ labels: string[], datasets: MutableDataset[] }>(() => ({
  labels: [...props.labels],
  datasets: props.datasets.map(d => ({
    label: d.label,
    data: [...d.data],
    backgroundColor: Array.isArray(d.backgroundColor)
      ? [...d.backgroundColor] as string[]
      : (d.backgroundColor as string | undefined),
    borderColor: Array.isArray(d.borderColor)
      ? [...d.borderColor] as string[]
      : (d.borderColor as string | undefined),
  })),
}))
</script>

<template>
  <div :style="{ height: `${props.height ?? 300}px` }">
    <Line
      :data="chartData"
      :options="options"
    />
  </div>
</template>
