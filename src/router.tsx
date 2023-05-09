import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Root } from "./routes/root"
import { TodoListContainer } from "./components/TodoListContainer"
import { Detail } from "./components/Detail"

interface Subtask {
  id: string;
  label: string;
}

interface Todo {
  id: string;
  label: string;
  isCompleted: boolean;
  createdDate: Date;
  completedDate?: Date;
  items: Subtask[]
}

interface RouterProps {
  inputValue: string;
  setInputValue: (e: string) => void;
  addTodo: () => void;
  todos: Todo[];
  deleteTodo: (id: string) => void;
  deleteAllTodos: () => void;
  completeTodo: (id: string) => void;
  subtaskInputValue: string;
  setSubtaskInputValue: (e: string) => void;
  addSubtask: (id: string, subtaskText: string) => void;
  editTodo: (id: string, newText: string) => void;
  isEdit: boolean;
  setIsEdit: (e: boolean) => void;
  toggleEdit: (todoText: string) => void;
  newInputValue: string;
  setNewInputValue: (e: string) => void;
  deleteSubtask: (todoId: string, subtaskId: string) => void;
  handleDeleteSelectedTasks: () => void;
}

export const Router: React.FC<RouterProps> = ({
  inputValue,
  setInputValue,
  addTodo,
  todos,
  deleteTodo,
  deleteAllTodos,
  completeTodo,
  subtaskInputValue,
  setSubtaskInputValue,
  addSubtask,
  editTodo,
  isEdit,
  setIsEdit,
  toggleEdit,
  newInputValue,
  setNewInputValue,
  deleteSubtask,
  handleDeleteSelectedTasks
}) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "todos",
          element: <TodoListContainer
            inputValue={inputValue}
            setInputValue={setInputValue}
            addTodo={addTodo}
            todos={todos}
            deleteAllTodos={deleteAllTodos}
            handleDeleteSelectedTasks={handleDeleteSelectedTasks}
          />,
          children: [
            {
              path: ":id",
              element: <Detail
                todos={todos}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
                subtaskInputValue={subtaskInputValue}
                setSubtaskInputValue={setSubtaskInputValue}
                addSubtask={addSubtask}
                editTodo={editTodo}
                inputValue={inputValue}
                setInputValue={setInputValue}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                toggleEdit={toggleEdit}
                newInputValue={newInputValue}
                setNewInputValue={setNewInputValue}
                deleteSubtask={deleteSubtask}
              />
            }
          ]
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}