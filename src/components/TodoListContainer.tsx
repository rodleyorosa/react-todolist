import { Form } from "./Form"
import { TodoList } from "./TodoList"

interface Todo {
    id: number;
    text: string;
    isCompleted: boolean;
    createdDate: Date;
    completedDate?: Date;
}

interface TodoListContainerProps {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    addTodo: () => void;
    todos: Todo[]
}

export const TodoListContainer: React.FC<TodoListContainerProps> = ({ inputValue, setInputValue, addTodo, todos }) => {
    return (
        <div style={{ width: "500px" }}>
            <Form inputValue={inputValue} setInputValue={setInputValue} addTodo={addTodo} />
            <TodoList todos={todos} />
        </div>
    )
}