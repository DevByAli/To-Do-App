import Jwt, { type Secret } from 'jsonwebtoken'

import { ACCESS_TOKEN_EXPIRY } from './constants'

export interface AccessTokenBody {
  name: string
  email: string
}

export const SignAccessToken = (name: string, email: string): string => {
  const token: AccessTokenBody = { name, email }

  return Jwt.sign(token, process.env.ACCESS_SECRET as Secret, {
    expiresIn: ACCESS_TOKEN_EXPIRY
  })
}
