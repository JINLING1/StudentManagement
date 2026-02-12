import { supabase } from '../utils/supabase.js'

export async function createTeacher(teacher) {
  const { error } = await supabase.from('teacher').insert([teacher])
  if (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
}

export async function getTeacherByTeacherId(teacherId) {
  const { data: teacher, error } = await supabase
    .from('teacher')
    .select('class_in_charge, name')

    // Filters
    .eq('teacher_id', teacherId)
  if (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
  return teacher
}

export async function updateTeacher(teacherId, newTeacher) {
  const { data, error } = await supabase
    .from('teacher')
    .update(newTeacher)
    .eq('teacher_id', teacherId)
    .select()

  if (error) {
    console.log(error.message)
    return
  }
  return data
}
