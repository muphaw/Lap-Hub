import { Student } from "@/types/users"
import axiosInstance from "./axiosInstance"

export const getStudents = ()=>{
  return axiosInstance.get<Student>('/students')
}
export const getStudentProfile = (student_id :number)=>{
  return axiosInstance.get<Student>(`/students/${student_id}`)
}
