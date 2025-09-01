import { defineWorker } from '#processor'
import type { Job } from 'bullmq'

export default defineWorker({
  name: 'default',
  processor: async (job: Job) => { return job },
})
