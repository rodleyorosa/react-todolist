import { createContext, useCallback, useEffect, useState } from "react"
import { v4 } from 'uuid';
import { Router } from "./router"

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

interface ContextProps {
  selectedTasks: string[];
  setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>;
  handleDeleteSelectedTasks: () => void;
  handleCompleteSelectedTasks: () => void;
  isSelectionActive: boolean;
  setIsSelectionActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const CheckboxContext = createContext<ContextProps>({
  selectedTasks: [],
  setSelectedTasks: () => undefined,
  handleDeleteSelectedTasks: () => undefined,
  handleCompleteSelectedTasks: () => undefined,
  isSelectionActive: false,
  setIsSelectionActive: () => undefined
})

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [subtaskInputValue, setSubtaskInputValue] = useState<string>("");
  const [newInputValue, setNewInputValue] = useState<string>("")
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isSelectionActive, setIsSelectionActive] = useState<boolean>(false)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  // Carica i todos dal localStorage al mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  // Salva i todos al localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = useCallback(() => {
    if (inputValue !== '') {
      const newTodo = {
        id: v4(),
        label: inputValue,
        isCompleted: false,
        createdDate: new Date(),
        completedDate: undefined,
        items: [],
      }

      setTodos((prev) => [...prev, newTodo])
      setInputValue("")

    }
  }, [inputValue])

  const toggleEdit = useCallback((todoText) => {
    setNewInputValue(todoText)
    setIsEdit(!isEdit)
  }, [isEdit])

  const editTodo = useCallback((id: string, newText: string) => {
    setTodos((prev) => {
      return prev.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            label: newText ? newText : '-'
          }
        }
        return todo
      })
    })
    setIsEdit(false)
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id))
  }, [])

  const completeTodo = useCallback((id: string) => {
    setTodos((prev) => {
      return prev.map(todo =>
        todo.id === id ? {
          ...todo,
          isCompleted: !todo.isCompleted,
          completedDate: new Date()
        } : todo
      )
    })

  }, []);

  const addSubtask = useCallback((todoId: string, subtaskText: string) => {
    if (!subtaskText.trim()) {
      return;
    }
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          items: [
            ...todo.items,
            { id: v4(), label: subtaskText },
          ],
        };
      } else {
        return todo;
      }
    });

    setSubtaskInputValue("");
    setTodos(updatedTodos);
  }, [todos])

  const deleteAllTodos = useCallback(() => {
    setTodos([])
  }, [])

  const deleteSubtask = useCallback((todoId: string, subtaskId: string) => {
    setTodos(prev => {
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
    setTodos(prev => prev.filter(task => !selectedTasks.includes(task.id)))
    setIsSelectionActive(prev => !prev)
  }, [selectedTasks])

  const handleCompleteSelectedTasks = useCallback(() => {
    setTodos((prev) => {
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

  return (
    <CheckboxContext.Provider value={{ selectedTasks, setSelectedTasks, handleDeleteSelectedTasks, handleCompleteSelectedTasks, isSelectionActive, setIsSelectionActive }}>
      <Router
        inputValue={inputValue}
        setInputValue={setInputValue}
        addTodo={addTodo}
        todos={todos}
        deleteTodo={deleteTodo}
        deleteAllTodos={deleteAllTodos}
        completeTodo={completeTodo}
        subtaskInputValue={subtaskInputValue}
        setSubtaskInputValue={setSubtaskInputValue}
        addSubtask={addSubtask}
        editTodo={editTodo}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        toggleEdit={toggleEdit}
        newInputValue={newInputValue}
        setNewInputValue={setNewInputValue}
        deleteSubtask={deleteSubtask}
      />
    </CheckboxContext.Provider>
  )
}

export default App