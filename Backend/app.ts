import cors from 'cors'
import cookieParser from 'cookie-parser'
import express, { type NextFunction, type Response, type Request } from 'express'

import TaskRouter from './router/task.router'
import UserRouter from './router/user.router'
import ErrorHandler from './utils/ErrorHandler'
import ErrorMiddleware from './middlewares/error'
import { isAuthenticated } from './middlewares/auth'

export const app = express()

// body parser
app.use(express.json({ limit: '5mb' }))

// cookie parser
app.use(cookieParser())

app.use(cors())

app.use('/api/v1', UserRouter)
app.use('/api/v1', isAuthenticated, TaskRouter)

// if the invalide route is hit
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  const err = new ErrorHandler(`Route ${req.originalUrl} not found.`, 404)
  next(err)
})

app.use(ErrorMiddleware)
