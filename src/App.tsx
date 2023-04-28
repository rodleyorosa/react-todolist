import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Root } from "./routes/root"
import { TodoListContainer } from "./components/TodoListContainer"
import { Detail } from "./components/Detail"
import { createContext, useCallback, useState } from "react"


interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  createdDate: Date;
  completedDate?: Date;
}

interface Context {
  todos: Todo[];
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodosContext = createContext<Context>({ todos: [], completeTodo: () => undefined, deleteTodo: () => { throw Error("") } })

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const addTodo = () => {
    if (inputValue !== '') {
      const newTodo = {
        id: todos.length + 1,
        text: inputValue,
        isCompleted: false,
        createdDate: new Date(),
        completedDate: undefined,
      }

      setTodos((prev) => [...prev, newTodo])
      setInputValue("")
    }
  }

  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id))
  }, [])

  const completeTodo = useCallback((id: number) => {
    setTodos((prev) => {
      return prev.map(todo =>
        todo.id === id ? {
          ...todo,
          isCompleted: !todo.isCompleted,
          completedDate: todo.isCompleted ? undefined : new Date()
        } : todo
      )
    })
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "todos",
          element: <TodoListContainer inputValue={inputValue} setInputValue={setInputValue} addTodo={addTodo} todos={todos}/>,
        },
        {
          path: "todos/:id",
          element: <Detail todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
        }
      ]
    }
  ])

  return (
    <TodosContext.Provider value={{ todos, completeTodo, deleteTodo }}>
      <RouterProvider router={router} />
    </TodosContext.Provider>
  )
}

export default App