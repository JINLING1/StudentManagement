import { supabase } from '../utils/supabase.js'

export async function getStudentList() {
  const { data: student, error } = await supabase.from('student').select('*')

  if (error) {
    console.log(error.message)
    return
  }
  return student
}

export async function addStudent(newStudent) {
  const { data, error } = await supabase.from('student').insert([newStudent]).select()
  if (error) {
    console.log(error.message)
    return
  }
  return data
}
