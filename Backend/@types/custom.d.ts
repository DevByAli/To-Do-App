import { type AccessTokenBody } from '../utils/signAccessToken'

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenBody
    }
  }
}
