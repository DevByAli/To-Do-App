import Jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import { type Secret, type JwtPayload } from 'jsonwebtoken'
import { type NextFunction, type Response, type Request } from 'express'

import CatchAsyncError from './CatchAsyncError'
import ErrorHandler from '../utils/ErrorHandler'
import { type AccessTokenBody } from '../utils/signAccessToken'

configDotenv()

// Authenticated User
export const isAuthenticated = CatchAsyncError(async (req: Request, _res: Response, next: NextFunction) => {
  const accessToken = req.headers.token as string

  if (accessToken === undefined) {
    next(new ErrorHandler('Please login to access this resource', 400))
    return
  }

  // Verify the token is valid or not
  const decoded = Jwt.verify(accessToken, process.env.ACCESS_SECRET as Secret) as JwtPayload as AccessTokenBody
  if (decoded === undefined || decoded === null) {
    next(new ErrorHandler('Access token is not valid', 400))
    return
  }

  req.user = decoded
  next()
})
