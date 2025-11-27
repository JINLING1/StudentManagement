import { supabase } from '../utils/supabase.js'
import { getConfig } from '../utils/configHelper.js'
import { updateUser } from './apiAuth.js'
const token = getConfig('SUPABASE_TOKEN')
const supabaseURL = getConfig('SUPABASE_URL')

const userToken = JSON.parse(localStorage.getItem(token))

export async function uploadAvatar(avatarFile) {
  const newAvatarFileName = `${userToken.user.email}-${Date.now()}.png`

  const { data, error } = await supabase.storage
    .from('Avatar')
    .upload(`public/${newAvatarFileName}`, avatarFile, {
      cacheControl: '3600',
      upsert: false,
    })
  if (error) {
    console.log(error.message)
    return
  }
  const updateUserData = await updateUser({
    avatar: `${supabaseURL}/storage/v1/object/public/Avatar/public/${newAvatarFileName}`,
  })
  // 返回文件URL
  return updateUserData
}
