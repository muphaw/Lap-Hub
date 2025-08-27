import { fetchUsers } from "@/service/userService"
import type { User } from "@/types/users"
import { useQuery } from "@tanstack/vue-query"

export const useUsersQuery = () => {
  return useQuery<User[]>({
  queryKey: ['users'],
  queryFn: fetchUsers,
})
}