import { supabase } from '@/utils/supabase.js'
const mockScoreList = [
  {
    id: '1',
    name: 'Ray Ganderton',
    class: 'Class 1 | Year 9',
    subject: 'Math',
    semester: '2025 Spring',
    score: 86,
  },
  {
    id: '2',
    name: 'Liam Patterson',
    class: 'Class 2 | Year 8',
    subject: 'English',
    semester: '2025 Spring',
    score: 91,
  },
  {
    id: '3',
    name: 'Emma Collins',
    class: 'Class 3 | Year 9',
    subject: 'Science',
    semester: '2025 Spring',
    score: 88,
  },
  {
    id: '4',
    name: 'Noah Whitfield',
    class: 'Class 1 | Year 10',
    subject: 'Math',
    semester: '2025 Spring',
    score: 79,
  },
  {
    id: '5',
    name: 'Olivia Sanderson',
    class: 'Class 2 | Year 9',
    subject: 'History',
    semester: '2025 Spring',
    score: 94,
  },
  {
    id: '6',
    name: 'Ethan McKinley',
    class: 'Class 3 | Year 8',
    subject: 'Biology',
    semester: '2025 Spring',
    score: 83,
  },
  {
    id: '7',
    name: 'Ava Thornton',
    class: 'Class 1 | Year 9',
    subject: 'Math',
    semester: '2025 Spring',
    score: 90,
  },
  {
    id: '8',
    name: 'Mason Harwood',
    class: 'Class 2 | Year 10',
    subject: 'Physics',
    semester: '2025 Spring',
    score: 87,
  },
  {
    id: '9',
    name: 'Sophia Rainsford',
    class: 'Class 3 | Year 9',
    subject: 'Chemistry',
    semester: '2025 Spring',
    score: 92,
  },
  {
    id: '10',
    name: 'Logan Fairchild',
    class: 'Class 1 | Year 8',
    subject: 'Geography',
    semester: '2025 Spring',
    score: 75,
  },
  {
    id: '11',
    name: 'Isabella Carleton',
    class: 'Class 2 | Year 9',
    subject: 'English',
    semester: '2025 Spring',
    score: 89,
  },
  {
    id: '12',
    name: 'James Ellington',
    class: 'Class 3 | Year 10',
    subject: 'Math',
    semester: '2025 Spring',
    score: 84,
  },
  {
    id: '13',
    name: 'Mia Alderidge',
    class: 'Class 1 | Year 9',
    subject: 'Science',
    semester: '2025 Spring',
    score: 93,
  },
  {
    id: '14',
    name: 'Benjamin Hargrave',
    class: 'Class 2 | Year 8',
    subject: 'History',
    semester: '2025 Spring',
    score: 78,
  },
  {
    id: '15',
    name: 'Charlotte Winslow',
    class: 'Class 3 | Year 9',
    subject: 'Biology',
    semester: '2025 Spring',
    score: 95,
  },
  {
    id: '16',
    name: 'Henry Ashford',
    class: 'Class 1 | Year 10',
    subject: 'Physics',
    semester: '2025 Spring',
    score: 81,
  },
  {
    id: '17',
    name: 'Amelia Thornton',
    class: 'Class 2 | Year 9',
    subject: 'Math',
    semester: '2025 Spring',
    score: 88,
  },
  {
    id: '18',
    name: 'Alexander Brookstone',
    class: 'Class 3 | Year 8',
    subject: 'Chemistry',
    semester: '2025 Spring',
    score: 82,
  },
  {
    id: '19',
    name: 'Harper Middleton',
    class: 'Class 1 | Year 9',
    subject: 'English',
    semester: '2025 Spring',
    score: 91,
  },
  {
    id: '20',
    name: 'Daniel Kingsford',
    class: 'Class 2 | Year 10',
    subject: 'Math',
    semester: '2025 Spring',
    score: 77,
  },
]

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
