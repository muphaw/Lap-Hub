import { loginUser, registerUser } from '@/api/authApi'

export const handleLogin = async (email: string, password: string) => {
  const { data } = await loginUser(email, password)
  return data
}

export const handleRegister = async (uni_id: number, email: string, password: string, password_confirmation: string) => {
  const { data } = await registerUser(uni_id, email, password, password_confirmation)
  return data
}
