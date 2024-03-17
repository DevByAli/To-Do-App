import { Router } from 'express'
import { activateAccount, login, logout, register } from '../controllers/user.controller'
import { isAuthenticated } from '../middlewares/auth'

const UserRouter = Router()

UserRouter.post('/register-user', register)
UserRouter.post('/activate-account', activateAccount)

UserRouter.post('/login', login)
UserRouter.get('/logout', isAuthenticated, logout)

export default UserRouter
