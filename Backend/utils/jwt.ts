import { type Response } from 'express'
import { type IUser } from '../interfaces/IUser'
import { SignAccessToken } from './signAccessToken'

export const sendToken = (result: IUser, res: Response): void => {
  // the token that will used to authenticate the user
  const accessToken = SignAccessToken(result.name, result.email)

  res.status(200).json({
    success: true,
    message: 'User logged in.',
    token: accessToken
  })
}
