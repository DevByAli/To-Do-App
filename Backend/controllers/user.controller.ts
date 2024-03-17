import { configDotenv } from 'dotenv'
import Jwt, { type Secret } from 'jsonwebtoken'
import { type Request, type Response, type NextFunction } from 'express'

import sendMail from '../mail/sendMail'
import { sendToken } from '../utils/jwt'
import ErrorHandler from '../utils/ErrorHandler'
import { type IUser } from '../interfaces/IUser'
import { ACCESS_TOKEN } from '../utils/constants'
import { compare } from '../utils/comparePassword'
import UserRepository from '../Repository/user.repository'
import CatchAsyncError from '../middlewares/CatchAsyncError'
import { type IActivationToken, createActivationToken } from '../utils/createToken'

configDotenv()

interface IRegisteration {
  name: string
  email: string
  password: string
}

export const register = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body

    // name or email or password not provided
    if (name == null || email == null || password == null) {
      next(new ErrorHandler('Please provide name, email and password', 400))
      return
    }

    // Check either the email is already used or not
    const result = await UserRepository.getUser(String(email))

    if (result !== null) { // email is already used
      next(new ErrorHandler('Email already exists.', 400))
      return
    }

    const user: IRegisteration = { name, email, password }
    const { token, activationCode } = await createActivationToken(user)

    // Data that will use in the html that will render and send for email
    const data = { user: { name: user.name }, activationCode }

    // Sending the mail to the user with activation code
    await sendMail({ email: user.email, subject: 'Activate your account', template: 'activation-mail.ejs', data })

    res.status(201).json({
      success: true,
      message: `Please check your email: ${user.email} to activate your account`,
      token
    })
  } catch (error: any) {
    next(new ErrorHandler(String(error.message), 500))
  }
})

//* ************************
// Activate User Controller
//* ************************
export interface IActivationRequest {
  activationToken: IActivationToken
  activationCode: string
}

interface DecodedToken {
  user: IUser
  activationCode: string
}

export const activateAccount = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { activationToken, activationCode } = req.body as IActivationRequest

  // activation code is not provided
  if (activationCode == null) {
    next(new ErrorHandler('Please provide the activation code', 400))
    return
  }

  // verify that the token is valid or not
  const decode = (Jwt.verify(String(activationToken), process.env.ACTIVATION_SECRET as Secret) as Jwt.JwtPayload) as DecodedToken

  // check that the activation code enter by user is same as the code send in email
  const isActivationCodeSame = await compare(activationCode, decode.activationCode)
  if (!isActivationCodeSame) {
    next(new ErrorHandler('Invalid activation code', 400))
    return
  }

  const { name, email, password } = decode.user

  // Create the user
  await UserRepository.createUser(name, email, password)
    .then((result: string) => {
      res.status(201).json({
        success: true,
        message: result
      })
    })
    .catch((error: any) => {
      next(new ErrorHandler(String(error.message), 500))
    })
})

//* ************************
// Login User Controller
//* ************************
export const login = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  if (email == null || password == null) {
    next(new ErrorHandler('Please provide email and password', 400))
    return
  }

  await UserRepository.getUser(String(email))
    .then(async (result: IUser | null) => {
      // User not exists
      if (result === null) {
        next(new ErrorHandler('Invalid email or password', 400))
        return
      }

      // Check: Is the password is correct?
      const isPasswordCorrect = await compare(String(password), result.password)
      if (!isPasswordCorrect) {
        next(new ErrorHandler('Invalid email or password', 400))
        return
      }

      // send the token in the cookie and send response
      sendToken(result, res)
    })
    .catch((error: any) => {
      next(new ErrorHandler(String(error.message), 500))
    })
})

//* ************************
// logout user
//* ************************
export const logout = CatchAsyncError(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // make the cookie invalid
    res.cookie(ACCESS_TOKEN, '', { maxAge: 1 })

    res.status(200).json({
      success: true,
      message: 'Logout successfully'
    })
  } catch (error: any) {
    next(new ErrorHandler(String(error.message), 500))
  }
})
