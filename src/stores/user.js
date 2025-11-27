import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
  })
  function updateUser(newUserMetadata = {}) {
    user.value = newUserMetadata
  }

  return { user, updateUser }
})
