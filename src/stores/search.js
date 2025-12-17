import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const studentSearchCondition = ref([])
  const scoreSearchCondition = ref([])

  return { studentSearchCondition, scoreSearchCondition }
})
