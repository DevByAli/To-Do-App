import { configDotenv } from 'dotenv'

configDotenv()

export const configurationDB = {
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_NAME,
  connectionLimit: 10,
  connectTimeout: 60000
}
