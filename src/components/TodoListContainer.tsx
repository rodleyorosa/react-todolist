import { Outlet } from "react-router-dom";
import { Form } from "./Form"
import { TodoList } from "./TodoList"
import { Button, Container, Icon, IconButton, Padding, Responsive, Text } from "@zextras/carbonio-design-system";
import { useCallback, useState } from "react";

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

    const [isSelectionActive, setIsSelectionActive] = useState<boolean>(false)

    const toggleSelection = useCallback(() => {
        setIsSelectionActive(prev => !prev)
    }, [])

    return (
        <>
            <Responsive mode="mobile">
                <Container orientation="vertical">
                    <Container>
                        <div style={{ width: "500px" }}>
                            <div style={{ display: "flex", padding: "10px 0", alignItems: 'center' }}>
                                {isSelectionActive ?
                                    <>
                                        <IconButton
                                            icon="ArrowBack"
                                            iconColor="primary"
                                            size="large"
                                            onClick={() => { toggleSelection() }} />
                                        <Button
                                            size="large"
                                            color="primary"
                                            type="ghost"
                                            label="SELEZIONA TUTTI"
                                            onClick={() => { }} />
                                    </> :
                                    <>
                                        <IconButton
                                            icon="CheckmarkSquare"
                                            iconColor="primary"
                                            size="large"
                                            onClick={() => { toggleSelection() }} />
                                        <Text>Attiva modalità di selezione</Text>
                                    </>
                                }
                            </div>
                            <Form
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                addTodo={addTodo}
                            />
                            <TodoList
                                todos={todos}
                                isSelectionActive={isSelectionActive}
                            />
                            <Padding vertical={"10px"}>
                                <Button type="outlined" label="DELETE ALL" color="error" onClick={() => deleteAllTodos()} />
                            </Padding>
                        </div>
                    </Container>
                    <Container>
                        <Outlet />
                    </Container>
                </Container>
            </Responsive>
            <Responsive mode="desktop">
                <Container orientation="horizontal">
                    <Container>
                        <div style={{ width: "500px" }}>
                            <div style={{ display: "flex", padding: "10px 0", alignItems: 'center' }}>
                                {isSelectionActive ?
                                    <>
                                        <IconButton
                                            icon="ArrowBack"
                                            iconColor="primary"
                                            size="large"
                                            onClick={() => { toggleSelection() }} />
                                        <Button
                                            size="large"
                                            color="primary"
                                            type="ghost"
                                            label="SELEZIONA TUTTI"
                                            onClick={() => { }} />
                                    </> :
                                    <>
                                        <IconButton
                                            icon="CheckmarkSquare"
                                            iconColor="primary"
                                            size="large"
                                            onClick={() => { toggleSelection() }} />
                                        <Text>Attiva modalità di selezione</Text>
                                    </>
                                }
                            </div>
                            <Form
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                addTodo={addTodo}
                            />
                            <TodoList
                                todos={todos}
                                isSelectionActive={isSelectionActive}
                            />
                            <Padding vertical={"10px"}>
                                <Button type="outlined" label="DELETE ALL" color="error" onClick={() => deleteAllTodos()} />
                            </Padding>
                        </div>
                    </Container>
                    <Container>
                        <Outlet />
                    </Container>
                </Container>
            </Responsive>
        </>
    )
}