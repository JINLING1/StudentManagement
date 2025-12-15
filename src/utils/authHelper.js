import { getUser } from '@/services/apiAuth.js'

export async function isAuthenticated() {
  const user = await getUser()
  return user !== null
}
