import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { ITask } from "../interfaces/ITask";
import { EditTodoForm } from "./EditTodoForm";
import { toast, Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { ITodoItem } from "../interfaces/ITodoItem";
import { UpdateTaskService } from "../services/updateTask.service";
import { DeleteTaskService } from "../services/deleteTask.service";
import { AddTaskService, IGetTask } from "../services/AddTask.service";
import {GetAllTasksService, IGetAllTask} from "../services/GetAllTasks.service";

export const TodoWrapper: React.FC = () => {
  const [tasks, setTasks] = useState<ITodoItem[]>([]);

  const addTodo = (task: string): void => {
    AddTaskService(task, (error?: string, result?: IGetTask) => {
      if (result) {
        setTasks([...tasks, result.task]); // update the UI
        toast.success("Task Added");
      } else if (error) {
        toast.error(error);
      }
    });
  };

  const deleteTodo = (id: string): void => {
    const oldTasks = [...tasks]; // save to undo when error occur during deletion

    DeleteTaskService(id, (error?: string, result?: string) => {
      if (result) {
        // task is deleted
        toast.success(result);

        // delete the task from the UI
        setTasks(tasks.filter((todo) => todo.id !== id));
      } else if (error) {
        toast.error(error);

        // If the error occur Optimistically undo the deleted task
        setTasks(oldTasks);
      }
    });
  };

  // Optimistically update the task in the UI
  const OptimisticCompleteTask = (task: ITask) => {
    setTasks(
      tasks.map((todo) =>
        todo.id === task.id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleComplete = (task: ITask): void => {
    OptimisticCompleteTask(task);

    // toggle the complete
    task.completed = !task.completed;

    UpdateTaskService(task, (error?: string, result?: ITask) => {
      if (result) {
        toast.success("Task Updated");
      } else if (error) {
        toast.error(error);

        // Revert the changes in case of an error for Optimistic UI
        OptimisticCompleteTask(task);
      }
    });
  };

  // This function enable the editing
  const editTodo = (id: string): void => {
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Handle the optimistics UI updation when the task edit
  const OptimisticEditTask = (id: string, task: string) => {
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (id: string, task: string): void => {
    OptimisticEditTask(id, task);

    // Get old task the task to get its status (i.e; completed or not)
    const oldTask = tasks.find((task) => task.id === id);

    // prepare the updated task
    const updatedTask = { id, task, completed: Boolean(oldTask?.completed) };

    UpdateTaskService(updatedTask, (error?: string, result?: ITask) => {
      if (result) {
        toast.success("Task Updated");
      } else if (error) {
        toast.error(error);

        // undo the updated task id any error is occur
        OptimisticEditTask(id, task);
      }
    });
  };

  useEffect(() => {
    GetAllTasksService((error?: string, result?: IGetAllTask) => {
      if (result) {
        setTasks(result.tasks.map((todo) => ({ ...todo, isEditing: false })));
      } else if (error) {
        toast.error(error);
      }
    });
  }, []);

  return (
    <div className="TodoWrapper">
      <Toaster />
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {tasks.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
