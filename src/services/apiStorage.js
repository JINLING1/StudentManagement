import { supabase } from '../utils/supabase.js'
import { getConfig } from '../utils/configHelper.js'
import { updateUser } from './apiAuth.js'

const supabaseURL = getConfig('SUPABASE_URL')

export async function uploadAvatar(avatarFile, newAvatarFileName) {
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
}
