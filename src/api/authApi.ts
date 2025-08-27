import { type User } from "@/types/users"
import axiosInstance from "./axiosInstance"

export const loginUser = (email : string,password :string)=>{
  return axiosInstance.post<{access_token : string,user : User}>('/login',{email,password})
}
export const registerUser = (uni_id: number, email: string, password: string, password_confirmation: string)=>{
  return axiosInstance.post<{access_token : string,user : User}>('/register',{uni_id,email,password,password_confirmation})
}

export const logoutUser = () => {
  return axiosInstance.post<{access_token :string}>('/logout')
}