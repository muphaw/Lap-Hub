import axiosInstance from "./axiosInstance"
import type { Project } from "@/types/projects"


interface CollaboratorPayload {
  user_id: number
  role?: string
}

export interface CreateProjectPayload {
  project_name: string
  project_detail: string
  project_date: string
  project_images: string[] 
  project_link : string
  collaborators: CollaboratorPayload[]
}
export const getProjects = ()=>{
  return axiosInstance.get<Project[]>('/projects')
}

export const getProjectbyId = (id: number) => {
  return axiosInstance.get<Project>(`/projects/${id}`)
}


export const createProject = (project : CreateProjectPayload)=>{
  return axiosInstance.post<Project>('/projects',project,
    {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const deleteProject = (id : number)=>{
  return axiosInstance.delete(`/projects/${id}`)
}

export const searchProject = async (query: string) => {
  return axiosInstance.get(`/search/projects?q=${encodeURIComponent(query)}`);
};