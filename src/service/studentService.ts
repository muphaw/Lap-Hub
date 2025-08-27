import { getStudentProfile, getStudents } from "@/api/studentsApi"

export const fetchStudent =async ()=>{
  const {data} = await getStudents()
  return data
}

export const fetchStudentProfile = async (student_id : number) =>{
  try {
    const response = await getStudentProfile(student_id)
    return response.data
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    throw error 
  }
}