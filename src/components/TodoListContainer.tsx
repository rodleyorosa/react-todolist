import { Outlet } from "react-router-dom";
import { Form } from "./Form"
import { TodoList } from "./TodoList"
import { Button, Container, Text } from "@zextras/carbonio-design-system";
import { useState } from "react";

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
    todos: Todo[];
    deleteAllTodos: () => void;
}

export const TodoListContainer: React.FC<TodoListContainerProps> = ({
    inputValue,
    setInputValue,
    addTodo,
    todos,
    deleteAllTodos,
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
                    <Button type="outlined" label="DELETE ALL" color="error" onClick={() => deleteAllTodos()} />
                </div>
            </Container>
            <Container>
                <Outlet />
            </Container>
        </Container>
    )
}