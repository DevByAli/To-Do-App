import bcrypt from 'bcryptjs'

export const compare = async (userPassword: string, hashPassword: string): Promise<boolean> => {
  return await bcrypt.compare(userPassword, hashPassword)
}
