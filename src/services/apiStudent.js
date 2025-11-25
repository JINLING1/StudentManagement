import { supabase } from '@/utils/supabase.js'

export async function getStudentList() {
  const { data: student, error } = await supabase.from('student').select('*')

  if (error) {
    console.log(error.message)
    return
  }
  return student
}
