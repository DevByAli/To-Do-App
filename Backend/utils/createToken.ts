import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'

import { type Secret } from 'jsonwebtoken'
import { type IUser } from '../interfaces/IUser'
import { ACITVATION_TOKEN_EXPIRY } from './constants'

configDotenv()

export interface IActivationToken {
  token: string
  activationCode: string
}

export const createActivationToken = async (user: IUser): Promise<IActivationToken> => {
  // create a random acitivation code
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString()

  // hash the user password and activation code
  const hashedPassword = await bcrypt.hash(user.password, 10)
  const hashedActivationCode = await bcrypt.hash(activationCode, 10)

  // data of the token that will use be use for checking either the use correct activation code
  const tokenData = {
    user: { ...user, password: hashedPassword },
    activationCode: hashedActivationCode // this will use to compare and check activation code is correct ot not that is enter by the user
  }

  const token = Jwt.sign(tokenData, process.env.ACTIVATION_SECRET as Secret, {
    expiresIn: ACITVATION_TOKEN_EXPIRY
  })
  return { token, activationCode }
}
