import { Accordion, Container, Divider, Icon, ListItem, ListV2, Padding, Radio, Row, Text } from "@zextras/carbonio-design-system"
import { useMemo } from "react"
import { Link, useNavigate } from "react-router-dom";

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
    todos: Todo[]
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {

    const navigate = useNavigate()

    const items = useMemo(
        () =>
            todos.map((todo) => (
                <ListItem key={todo.id}>
                    {() => (
                        <>
                            <Accordion padding={"medium"} items={[
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