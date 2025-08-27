import { createProject, deleteProject, getProjectbyId, getProjects, searchProject } from "@/api/projectApi"
import { toBase64 } from "@/lib/utils"
import type { Project } from "@/types/projects"

export interface FormData {
  title :string,
  description : string,
  images :  File[],
  date : string,
  link : string,
  collaborators : {user_id : number}[]
}
export const fetchProject =async ()=>{
  const response = await getProjects()
  return response.data.sort((a,b)=>new Date(b.created_at!).getTime()- new Date(a.created_at!).getTime())
}

export const fetchProjectById = async (id: number) =>{
  try {
    const response = await getProjectbyId(id)
    return response.data
  }catch(error){
    console.log(error)
  }
}

//create
export const handleProject = async (formData : FormData,user_id : number) =>{
   const base64Images = await Promise.all(
    formData.images.map(file => toBase64(file))
  )

    const payload: Project = {
    user_id,
    project_name: formData.title,
    project_detail: formData.description,
    project_date: formData.date,
    project_images: base64Images,
    project_link : formData.link,
    collaborators: formData.collaborators
  }
  return await createProject(payload)
}

export const deleteOneProject = async (id: number)=>{
  try{
      const response = await deleteProject(id)
      return response.data.message
    }catch(error){
      console.log(error)
    }
  }

export const searchProjects = async (query : string)=>{
  try{
    const response = await searchProject(query)
    return response.data
  }catch(error){
    console.log("response ",error)
    return []
  }
}