import { create } from "zustand";

interface Todo {
    id: string;
    label: string;
    isCompleted: boolean;
    createdDate: Date;
    completedDate?: Date;
    items: Todo[];
}

interface TodoStore {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    deleteTodo: (id: string) => void;
    completeTodo: (id: string) => void;
    editTodo: (id: string, newText: string) => void;
    deleteAllTodos: () => void;
}

export const todoStore = create<TodoStore>((set) => ({
    todos: [
        {
            id: '1',
            label: 'Main task is here',
            isCompleted: false,
            createdDate: new Date(),
            items: [
                {
                    id: '1',
                    label: 'This is a subtask text',
                    isCompleted: false,
                    createdDate: new Date(),
                    items: []
                }
            ]
        }
    ],
    addTodo: (todo) =>
        set((state) => ({
            todos: [...state.todos, todo]
        })),
    deleteTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id)
        })),
    completeTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted, completedDate: new Date() } : todo)
        })),
    editTodo: (id, newText) => {
        set((state) => ({
            todos: state.todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        label: newText ? newText : ''
                    }
                }
                return todo
            })
        }))
    },
    deleteAllTodos: () => {
        set((state) => ({
            todos: []
        }))
    },
      
}))
