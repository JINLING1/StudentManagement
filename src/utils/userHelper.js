import { getUser } from '@/services/apiAuth'

export async function getUserId() {
  try {
    const user = await getUser()
    if (!user) {
      throw new Error('User not found')
    }
    return user.id
  } catch (error) {
    console.error('Failed to fetch user ID:', error)
    throw error
  }
}
