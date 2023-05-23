import { createContext, useCallback, useState } from "react"
import { Router } from "./router";
import { todoStore } from "./store";

interface Todo {
  id: string;
  label: string;
  isCompleted: boolean;
  createdDate: Date;
  completedDate?: Date;
  items: Todo[];
}

interface ContextProps {
  selectedTasks: string[];
  setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>;
  handleDeleteSelectedTasks: () => void;
  handleCompleteSelectedTasks: () => void;
  isSelectionActive: boolean;
  setIsSelectionActive: React.Dispatch<React.SetStateAction<boolean>>
  toggleSelection: () => void;
}

export const CheckboxContext = createContext<ContextProps>({
  selectedTasks: [],
  setSelectedTasks: () => undefined,
  handleDeleteSelectedTasks: () => undefined,
  handleCompleteSelectedTasks: () => undefined,
  isSelectionActive: false,
  setIsSelectionActive: () => undefined,
  toggleSelection: () => undefined
})

const App: React.FC = () => {
  const [todos2, setTodos2] = useState<Todo[]>([])
  const [subtaskInputValue, setSubtaskInputValue] = useState<string>("");
  const [isSelectionActive, setIsSelectionActive] = useState<boolean>(false)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const { todos } = todoStore((state) => state)

  // Carica i todos dal localStorage al mount
  // useEffect(() => {
  //   const storedTodos = localStorage.getItem('todos');
  //   if (storedTodos) {
  //     addTodo(JSON.parse(storedTodos))
  //   }
  // }, [addTodo])

  // Salva i todos al localStorage quando cambiano
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos))
  // }, [todos])

  
  // const addSubtask = useCallback((todoId: string, subtaskText: string) => {
  //   if (!subtaskText.trim()) {
  //     return;
  //   }
  //   const updatedTodos = todos.map((todo) => {
  //     if (todo.id === todoId) {
  //       return {
  //         ...todo,
  //         items: [
  //           ...todo.items,
  //           { id: v4(), label: subtaskText },
  //         ],
  //       };
  //     } else {
  //       return todo;
  //     }
  //   });

  //   setSubtaskInputValue("");
  //   setTodos2(updatedTodos);
  // }, [todos])

  const deleteSubtask = useCallback((todoId: string, subtaskId: string) => {
    setTodos2(prev => {
      const updatedList = prev.map(todo => {
        if (todo.id === todoId) {
          const updatedSubtasks = todo.items.filter(subtask => subtask.id !== subtaskId)
          return { ...todo, items: updatedSubtasks }
        }
        return todo
      })
      return updatedList
    })
  }, [])

  const handleDeleteSelectedTasks = useCallback(() => {
    setTodos2(prev => prev.filter(task => !selectedTasks.includes(task.id)))
    setIsSelectionActive(prev => !prev)
  }, [selectedTasks])

  const handleCompleteSelectedTasks = useCallback(() => {
    setTodos2((prev) => {
      return prev.map(todo =>
        selectedTasks.includes(todo.id) ? {
          ...todo,
          isCompleted: todo.isCompleted = true,
          completedDate: new Date()
        } : todo
      )
    })
    setIsSelectionActive(prev => !prev)
  }, [selectedTasks])

  const toggleSelection = useCallback(() => {
    setIsSelectionActive(prev => !prev)
  }, [])

  return (
    <CheckboxContext.Provider value={{
      selectedTasks,
      setSelectedTasks,
      handleDeleteSelectedTasks,
      handleCompleteSelectedTasks,
      isSelectionActive,
      setIsSelectionActive,
      toggleSelection
    }}>
      <Router
        subtaskInputValue={subtaskInputValue}
        setSubtaskInputValue={setSubtaskInputValue}
        // addSubtask={addSubtask}
        deleteSubtask={deleteSubtask}
      />
    </CheckboxContext.Provider>
  )
}

export default App