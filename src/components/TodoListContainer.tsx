import { Outlet } from "react-router-dom";
import { Form } from "./Form"
import { TodoList } from "./TodoList"
import { Container } from "@zextras/carbonio-design-system";

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

interface TodoListContainerProps {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    addTodo: () => void;
    todos: Todo[]
}

export const TodoListContainer: React.FC<TodoListContainerProps> = ({
    inputValue,
    setInputValue,
    addTodo,
    todos
}) => {
    return (
        <Container orientation="horizontal">
            <Container>
                <div style={{ width: "500px" }}>
                    <Form
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        addTodo={addTodo}
                    />
                    <TodoList todos={todos} />
                </div>
            </Container>
            <Container>
                <Outlet />
            </Container>
        </Container>
    )
}