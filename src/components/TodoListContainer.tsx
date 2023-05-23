import { Outlet } from "react-router-dom";
import { Form } from "./Form"
import { Button, Container, Padding } from "@zextras/carbonio-design-system";
import { SelectionActive } from "./MultipleSelection/SelectionActive";
import { SelectionNotActive } from "./MultipleSelection/SelectionNotActive";
import { todoStore } from "../store";
import { useCallback, useContext } from "react";
import { CheckboxContext } from "../App";
import { v4 } from "uuid";
import { List } from "./List";

export const TodoListContainer: React.FC = () => {

    const { todos, addTodo, deleteAllTodos } = todoStore((state) => state)

    const handleAddTodo = useCallback((value: string) => {
        if (value !== '') {
            const newTodo = {
                id: v4(),
                label: value,
                isCompleted: false,
                createdDate: new Date(),
                completedDate: undefined,
                items: [],
            }

            addTodo(newTodo)

        }
    }, [addTodo])


    const { isSelectionActive } = useContext(CheckboxContext)

    const handleDeleteAllTodos = useCallback(() => {
        deleteAllTodos()
    }, [deleteAllTodos])

    return (
        <Container orientation="horizontal">
            <Container>
                <Container width={"500px"}>
                    <Container orientation="horizontal" mainAlignment="flex-start" padding={"10px 0"}>
                        {isSelectionActive ?
                            <SelectionActive
                                data-testid="selection-active"
                            />
                            :
                            <SelectionNotActive
                                data-testid="selection-not-active"
                            />
                        }
                    </Container>
                    <Form
                        defaultInputValue={""}
                        handleConfirmCallback={handleAddTodo}
                        buttonLabel="Add"
                    />
                    <List
                        datas={todos}
                    />
                    <Padding vertical={"10px"}>
                        <Button
                            type="outlined"
                            label="DELETE ALL"
                            color="error"
                            onClick={handleDeleteAllTodos}
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