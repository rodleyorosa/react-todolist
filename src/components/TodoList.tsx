import { Accordion, Button, Checkbox, Container, Divider, Icon, IconCheckbox, ListItem, ListV2, Padding, Radio, Row, Text, Tooltip } from "@zextras/carbonio-design-system"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";

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

interface TodoListProps {
    todos: Todo[];
    isSelectionActive: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
    todos,
    isSelectionActive
}) => {

    const navigate = useNavigate()

    const items = useMemo(
        () =>
            todos.map((todo) => (
                <ListItem key={todo.id}>
                    {() => (
                        <>
                            <Container orientation="horizontal" padding={"medium"}>
                                { isSelectionActive ? <Checkbox /> : null }
                                <Accordion
                                    items={[
                                        {
                                            id: todo.id,
                                            label: todo.id + '. ' + todo.label,
                                            icon: todo.isCompleted ? "Checkmark" : "",
                                            badgeType: 'unread',
                                            badgeCounter: todo.items.length ? todo.items.length : undefined,
                                            onClick: () => navigate("/todos/" + todo.id),
                                            items: todo.items.map((subtask) => ({
                                                id: subtask.id,
                                                label: subtask.label
                                            }))
                                        }
                                    ]} />
                            </Container>
                            <Divider style={{ width: "95%", margin: "auto" }} />
                        </> 
                    )}
                </ListItem>
            )), [todos]
    )

    return (
        <Container borderColor={"gray3"} height={"50vh"} mainAlignment="flex-start" orientation="vertical">
            <ListV2>{items}</ListV2>
        </Container>
    )
}