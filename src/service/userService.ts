import { getUserbyId, getUsers, searchUser } from "@/api/usersApi"
import { fetchStudentProfile } from "./studentService"
import type { User } from "@/types/users"

export const fetchUsers = async () => {
  const response = await getUsers()      
  const users = response. data.sort((a : any ,b : any)=>new Date(b.created_at!).getTime()- new Date(a.created_at!).getTime())        
 

  const usersWithProfiles = await Promise.all(
    users.map(async (user : any) => {
      try {
        const profile = await fetchStudentProfile(user.student_id)
        return { ...user, ...profile }
      } catch (err) {
        console.warn("Failed to fetch student profile", err)
        return user
      }
    })
  )

  return usersWithProfiles
}

export const fetchUserById = async (id: number) => {
  try {
    const response = await getUserbyId(id)
    const user = response.data

    if (user.student_id) {
      try {
        const profile = await fetchStudentProfile(user.student_id)
        return { ...user, ...profile }
      } catch (profileError) {
        console.warn("Failed to fetch student profile", profileError)
      }
    }

    return user 
  } catch (err) {
    console.error("Failed to fetch user", err)
    throw err
  }
}

export const searchUsers = async (query: string): Promise<User[]> => {
  try {
    const response = await searchUser(query);
    console.log('Search API raw response:', response.data);

    const data = response.data;
    if (typeof data === 'string') {
      console.warn('Unexpected search response:', data);
      return [];
    }
    if (Array.isArray(data)) {
      return data;
    }
    if (data && Array.isArray(data.users)) {
      return data.users;
    }
    console.warn('Unhandled search response:', data);
    return [];
  } catch (error) {
    console.error('Search API error:', error);
    return [];
  }
};


