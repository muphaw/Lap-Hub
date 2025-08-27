import { User } from "@/types/users"
import axiosInstance from "./axiosInstance"

export const getUsers = ()=>{
  return axiosInstance.get<User>('/users')
}

export const getUserbyId = (id: number) => {
  return axiosInstance.get<User>(`/users/${id}`)
}

export const searchUser = async (query: string) => {
  return axiosInstance.get(`/search/users?q=${encodeURIComponent(query)}`);
};