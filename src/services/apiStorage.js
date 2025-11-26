import { supabase } from '../utils/supabase.js'
export async function uploadAvatar(avatarFile) {
  const { data, error } = await supabase.storage
    .from('Avatar')
    .upload('public/avatar1.png', avatarFile, {
      cacheControl: '3600',
      upsert: false,
    })
  if (error) {
    console.log(error.message)
    return
  }
  return data
}
