import { type Request, type Response, type NextFunction } from 'express'

import ErrorHandler from '../utils/ErrorHandler'
import CatchAsyncError from '../middlewares/CatchAsyncError'
import TaskRepository from '../Repository/task.repository'
import { type ITask } from '../interfaces/ITask'

//* ********************************
// controller for create task
//* ********************************
interface CreateOrUpdateTaskRequestBody {
  task: string
  completed: boolean
}

export const CreateTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { task } = req.body as CreateOrUpdateTaskRequestBody

  // Title or description not provided
  if (task === null) {
    next(new ErrorHandler('Please provide title.', 400))
    return
  }

  // get email from request body
  const email = req.user?.email

  void TaskRepository.createTask(task, String(email))
    .then((result: ITask) => {
      res.status(201).json({
        success: true,
        task: result
      })
    }
    )
    .catch((error: any) => {
      next(new ErrorHandler(String(error.message), 500))
    })
})

//* ********************************
// controller for update task
//* ********************************
export const UpdateTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const { task, completed } = req.body as CreateOrUpdateTaskRequestBody

  // Task id is not provided
  if (id === null) {
    next(new ErrorHandler('Task id not provided', 400))
    return
  }

  // Title or description not provided
  if (task == null) {
    next(new ErrorHandler('Please provide task.', 400))
    return
  }

  // get email from request body
  const email = req.user?.email

  await TaskRepository.updateTask(id, task, completed, String(email))
    .then((result: ITask | null) => {
      // task not found
      if (result === null) {
        next(new ErrorHandler('Task not found.', 400))
        return
      }

      // updated task is send in response
      res.status(200).json({
        success: true,
        result
      })
    })
    .catch((error: any) => {
      next(new ErrorHandler(String(error.message), 500))
    })
})

//* ********************************
// controller for delete task
//* ********************************
export const DeleteTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id

  // Task id is not provided
  if (id === null) {
    next(new ErrorHandler('Task id not provided', 400))
    return
  }

  // get email from request body
  const email = req.user?.email

  await TaskRepository.deleteTask(id, String(email))
    .then((result: string | null) => {
      // task not found
      if (result === null) {
        next(new ErrorHandler('Task not found.', 400))
        return
      }

      // task is found
      res.status(200).json({
        success: true,
        message: 'Task deleted successfully.'
      })
    })
    .catch((error: any) => {
      next(new ErrorHandler(String(error.message), 500))
    })
})

//* **********************************
// controller to get all task of user
//* **********************************
export const GetAllTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  // get email from request body
  const email = req.user?.email

  await TaskRepository.getAllTask(String(email))
    .then((result: ITask[]) => {
      // return all the tasks of the user
      res.status(200).json({
        success: true,
        tasks: result
      })
    })
    .catch((error) => {
      next(new ErrorHandler(String(error.message), 500))
    })
})
