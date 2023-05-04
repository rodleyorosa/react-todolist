import { Accordion, Container, Divider, Icon, ListItem, ListV2, Padding, Radio, Row, Text } from "@zextras/carbonio-design-system"
import { useMemo } from "react"
import { Link } from "react-router-dom";

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

    const items = useMemo(
        () =>
            todos.map((todo) => (
                <ListItem key={todo.id}>
                    {() => (
                        <>
                            <Link to={`/todos/${todo.id}`} style={{ textDecoration: 'none' }}>
                                <Container orientation="horizontal" mainAlignment="space-between" padding="medium">
                                    <Accordion activeId={"1"} items={[
                                        {
                                            id: todo.id,
                                            label: todo.id + '. ' + todo.label,
                                            icon: todo.isCompleted ? "Checkmark" : "",
                                            badgeType: 'unread',
                                            badgeCounter: todo.items.length ? todo.items.length : undefined,
                                            items: todo.items.map((subtask) => ({
                                                id: subtask.id,
                                                label: subtask.label
                                            }))
                                        }
                                    ]} />
                                    <Icon icon={"ArrowIosForwardOutline"} size={"large"} />
                                </Container>
                            </Link>
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