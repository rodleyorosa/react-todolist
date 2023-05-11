import { Outlet } from "react-router-dom";
import { Form } from "./Form"
import { TodoList } from "./TodoList/TodoList"
import { Button, Container, Padding } from "@zextras/carbonio-design-system";
import { useCallback, useContext } from "react";
import { SelectionActive } from "./MultipleSelection/SelectionActive";
import { SelectionNotActive } from "./MultipleSelection/SelectionNotActive";
import { CheckboxContext } from "../App";

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
    setInputValue: (e: string) => void;
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

    const { isSelectionActive, setIsSelectionActive } = useContext(CheckboxContext)

    const toggleSelection = useCallback(() => {
        setIsSelectionActive(prev => !prev)
    }, [setIsSelectionActive])

    return (
        <Container orientation="horizontal">
            <Container>
                <Container width={"500px"}>
                    <Container orientation="horizontal" mainAlignment="flex-start" padding={"10px 0"}>
                        {isSelectionActive ?
                            <SelectionActive
                                toggleSelection={toggleSelection}
                            />
                            :
                            <SelectionNotActive
                                toggleSelection={toggleSelection}
                            />
                        }
                    </Container>
                    <Form
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        addTodo={addTodo}
                    />
                    <TodoList
                        todos={todos}
                    />
                    <Padding vertical={"10px"}>
                        <Button
                            type="outlined"
                            label="DELETE ALL"
                            color="error"
                            onClick={deleteAllTodos}
                        />
                    </Padding>
                </Container>
            </Container>
            <Container>
                <Outlet />
            </Container>
        </Container>
    )
}