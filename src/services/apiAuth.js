import { createClient } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase.js'
import { getConfig } from '@/utils/configHelper'
export async function signup(email, password, metadata = {}, shouldAutoLogin = true) {
  let authClient

  if (shouldAutoLogin) {
    //Signup.vue使用全局实例，注册成功后会自动替换LocalStorage，实现自动登录
    authClient = supabase
  } else {
    // StudentAdd.vue 使用 创建临时的，不保存 Session 的客户端
    const supabaseUrl = getConfig('SUPABASE_URL')
    const supabaseKey = getConfig('SUPABASE_KEY')

    authClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  }

  const { data, error } = await authClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: `User-${Date.now()}`,
        avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        ...metadata,
      },
    },
  })
  if (error) {
    console.log(error.message)
    return
  }
  return data
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
  return data
}

export async function signout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error.message)
  }
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function updateUser(newUserMetadata = {}) {
  const { data, error } = await supabase.auth.updateUser({
    data: newUserMetadata,
  })
  if (error) {
    console.log(error.message)
    return
  }
  return data
}
