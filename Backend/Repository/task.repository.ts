import { type MysqlError } from 'mysql'

import { type ITask } from '../interfaces/ITask'
import { QueryExecutor } from '../service/queryExecutor.service'

class TaskRepository {
  // This instance is used every where
  private static readonly instance: TaskRepository = new TaskRepository()

  private constructor () { } // make it private so that its instance can't be created by the user

  // Follow the Singleton design pattern
  public static getInstance (): TaskRepository {
    return this.instance
  }

  public async createTask (task: string, email: string): Promise<ITask> {
    return await new Promise((resolve, reject) => {
      const query = `INSERT INTO tasks (task, completed, user_email) 
                     VALUES (?, FALSE, ?)`

      QueryExecutor(query, [task, email], (error: MysqlError, result: any) => {
        if (error !== null) {
          reject(error)
        }

        resolve({
          id: result.insertId,
          task,
          completed: false
        } satisfies ITask)
      })
    })
  }

  public async getAllTask (email: string): Promise<ITask[]> {
    return await new Promise((resolve, reject) => {
      const query = 'SELECT id, task, completed FROM tasks where user_email = ?'

      QueryExecutor(query, [email], (error: MysqlError, result: any) => {
        if (error !== null) {
          reject(error)
        }
        resolve(result as ITask[])
      })
    })
  }

  public async updateTask (id: string, task: string, completed: boolean, email: string): Promise<ITask | null> {
    return await new Promise((resolve, reject) => {
      const query = `UPDATE tasks
                     SET task = ?, completed = ?
                     WHERE id = ? and user_email = ?`

      QueryExecutor(query, [task, completed, id, email], (error: MysqlError, result: any) => {
        if (error !== null) {
          reject(error)
        } else if (result.affectedRows === 0) { // tasks not found
          resolve(null)
        }

        resolve({ id, task, completed })
      })
    })
  }

  public async deleteTask (id: string, email: string): Promise<string | null> {
    return await new Promise((resolve, reject) => {
      const query = 'DELETE FROM tasks WHERE id = ? and user_email = ?'

      QueryExecutor(query, [id, email], (error: MysqlError, result: any) => {
        if (error !== null) {
          reject(error)
        } else if (result.affectedRows === 0) { // tasks not found
          resolve(null)
        }
        resolve('Task deleted successfully.')
      })
    })
  }
}

export default TaskRepository.getInstance()
