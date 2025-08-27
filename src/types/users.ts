export type Student = {
    student_id: number, 
    name: string,
    email : string,
    major: string,
    batch: string,
    image : string,
}

export type User = {
  [x: string]: any
  user_id: number
  student_id: number
  uni_id: number
  email: string
  created_at: string
  name?: string,
  major?: string,
  batch?: string,
  image?: string,
}