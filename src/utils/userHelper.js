import { getConfig } from '../utils/configHelper.js'

export function getUserId() {
  const token = getConfig('SUPABASE_TOKEN')

  const userToken = JSON.parse(localStorage.getItem(token))
  return userToken.user.id
}
