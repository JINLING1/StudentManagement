import { supabase } from '@/utils/supabase.js'

export async function getScoreList() {
  const { data: score, error } = await supabase.from('score').select('*')

  if (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
  return score
}

export async function createScore(newScore) {
  const { data, error } = await supabase.from('score').insert([newScore]).select()
  if (error) {
    console.log(error.message)
    return
  }
  return data
}

export async function deleteScore(scoreId) {
  const { data: score, error } = await supabase.from('score').delete().eq('id', scoreId)
  if (error) {
    console.log(error.message)
    return
  }
  return score
}

export async function getScoreByScoreId(scoreId) {
  const { data: score, error } = await supabase.from('score').select('*').eq('id', scoreId)

  if (error) {
    console.log(error.message)
    return
  }
  return score
}

export async function updateScore(scoreId, newScore) {
  const { data, error } = await supabase.from('score').update(newScore).eq('id', scoreId).select()
  if (error) {
    console.log(error.message)
    return
  }
  return data
}
