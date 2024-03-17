import { type MysqlError } from 'mysql'

import { TaskTableQuery } from '../models/task'
import { UserTableQuery } from '../models/user'
import { QueryExecutor } from './queryExecutor.service'

export const CreateTables = (): void => {
  try {
    // create the user table in database
    QueryExecutor(UserTableQuery, [], (error: MysqlError, _result: any) => {
      if (error !== null) {
        console.log(error.message)
        return
      }
      console.log('User table is created.')
    })

    // create the task table in database
    QueryExecutor(TaskTableQuery, [], (error: MysqlError, result: any) => {
      if (error !== null) {
        console.log(error.message)
        return
      }
      console.log('Task table is created.')
    })
  } catch (error: any) {
    console.log(error.message)
  }
}
