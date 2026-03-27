export function getConfig(config) {
  if (config === 'SUPABASE_URL') return import.meta.env.VITE_SUPABASE_URL
  if (config === 'SUPABASE_KEY') return import.meta.env.VITE_SUPABASE_KEY
  if (config === 'SUPABASE_TOKEN') return import.meta.env.VITE_SUPABASE_TOKEN
  if (config === 'PAGE_SIZE') return import.meta.env.VITE_PAGE_SIZE

  return null
}
