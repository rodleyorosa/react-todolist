import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Root } from "./routes/root"
import { TodoListContainer } from "./components/TodoListContainer"
import { Detail } from "./components/Detail"

interface RouterProps {
  subtaskInputValue: string;
  setSubtaskInputValue: (e: string) => void;
  deleteSubtask: (todoId: string, subtaskId: string) => void;
}

export const Router: React.FC<RouterProps> = ({
  subtaskInputValue,
  setSubtaskInputValue,
  deleteSubtask,
}) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "todos",
          element: <TodoListContainer />,
          children: [
            {
              path: ":id",
              element: <Detail
                subtaskInputValue={subtaskInputValue}
                setSubtaskInputValue={setSubtaskInputValue}
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