import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Root } from "./routes/root"
import { TodoListContainer } from "./components/TodoListContainer"
import { Detail } from "./components/Detail"
import { createContext, useCallback, useState } from "react"

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
  items: Subtask[];
}

interface Context {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  completeTodo: (id: string) => void;
}

// export const TodosContext = createContext<Context>({
//   todos: [],
//   completeTodo: () => undefined,
//   deleteTodo: () => { throw Error("") },
// })

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [subtaskInputValue, setSubtaskInputValue] = useState<string>("");

  const addTodo = () => {
    if (inputValue !== '') {
      const newTodo = {
        id: (todos.length + 1).toString(),
        label: inputValue,
        isCompleted: false,
        createdDate: new Date(),
        completedDate: undefined,
        items: [],
      }

      setTodos((prev) => [...prev, newTodo])
      setInputValue("")

    }
  }

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id))
  }, [])

  const completeTodo = useCallback((id: string) => {
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

  const addSubtask = (todoId: string, subtaskText: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subtasks: [
            ...todo.items,
            { id: todo.items.length + 1, text: subtaskText },
          ],
        };
      } else {
          return todo;
      }
    });
  
    setSubtaskInputValue("");
    setTodos(updatedTodos);
    console.log(todos)
  }

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
                addSubtask={addSubtask}/>
            }
          ]
        },
      ]
    }
  ])

  return (
    // <TodosContext.Provider value={{
    //   todos,
    //   completeTodo,
    //   deleteTodo,
    // }}>
    <RouterProvider router={router} />
    // </TodosContext.Provider>
  )
}

export default App