import { Router } from 'express'

import { CreateTask, DeleteTask, GetAllTask, UpdateTask } from '../controllers/task.controller'

const TaskRouter = Router()

TaskRouter.post('/create-task', CreateTask)
TaskRouter.patch('/update-task/:id', UpdateTask)
TaskRouter.delete('/delete-task/:id', DeleteTask)
TaskRouter.get('/get-all-task', GetAllTask)

export default TaskRouter
