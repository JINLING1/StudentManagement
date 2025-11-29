import { supabase } from '../utils/supabase.js'

export async function createTeacher(teacher) {
  const { error } = await supabase.from('teacher').insert([teacher])
  if (error) {
    console.log(error.message)
    return
  }
}

export async function getTeacherByTeacherId(teacherId) {
  const { data: teacher, error } = await supabase
    .from('teacher')
    .select('class_in_charge')

    // Filters
    .eq('teacher_id', teacherId)
  if (error) {
    console.log(error.message)
    return
  }
  return teacher
}
