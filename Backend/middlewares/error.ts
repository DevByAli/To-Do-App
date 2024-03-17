import { type NextFunction, type Request, type Response } from 'express'
import ErrorHandler from '../utils/ErrorHandler'

const ErrorMiddleware = (err: any, _req: Request, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode !== undefined ? err.statusCode : 500
  err.message = err.message !== undefined ? err.message : 'internal server error'

  // wrong jwt error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Json web token is invalid, try again.'
    err = new ErrorHandler(message, 400)
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    const message = 'Json web token is expired, try again.'
    err = new ErrorHandler(message, 400)
  }

  res.status(Number(err.statusCode)).json({
    success: false,
    message: err.message
  })
}

export default ErrorMiddleware
