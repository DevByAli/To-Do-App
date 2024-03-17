import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ITask } from "../interfaces/ITask";

interface TodoProps {
  task: {
    id: string;
    task: string;
    completed: boolean;
  };
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
  toggleComplete: (task: ITask) => void;
}

export const Todo: React.FC<TodoProps> = ({
  task,
  deleteTodo,
  editTodo,
  toggleComplete,
}) => {
  return (
    <div className="Todo">
      <p
        className={`${task.completed ? "completed" : "incompleted"}`}
        onClick={() => toggleComplete(task)}
      >
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};
