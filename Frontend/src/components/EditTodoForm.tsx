import React, { useState } from "react";

interface EditTodoFormProps {
  editTodo: (id: string, task: string) => void;
  task: {
    id: string;
    task: string;
  };
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ editTodo, task }) => {
  const [value, setValue] = useState<string>(task.task);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    editTodo(task.id, value);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
        required
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};
