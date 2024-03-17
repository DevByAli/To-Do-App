import { type MysqlError } from 'mysql'

import { type IUser } from '../interfaces/IUser'
import { QueryExecutor } from '../service/queryExecutor.service'

class UserRepository {
  private static readonly instance: UserRepository = new UserRepository()
  private constructor () { }

  public static getInstance (): UserRepository {
    return this.instance
  }

  public async createUser (name: string, email: string, password: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      const query = `INSERT INTO users (name, email, password) 
                     VALUES (?, ?, ?)`

      QueryExecutor(query, [name, email, password], (error: MysqlError, _result: any) => {
        if (error !== null) {
          reject(error)
        }
        resolve('User created successfully.')
      })
    })
  }

  public async getUser (email: string): Promise<IUser | null> {
    return await new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users where email = ?'

      QueryExecutor(query, [email], (error: MysqlError, result: any) => {
        if (error !== null) {
          reject(error)
        } else if (result[0] == null) { // user not found
          resolve(null)
        }

        // user found
        resolve(result[0] as IUser)
      })
    })
  }
}

export default UserRepository.getInstance()
