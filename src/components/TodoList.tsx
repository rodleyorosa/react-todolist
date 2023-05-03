import { Accordion, Container, Divider, Icon, ListItem, ListV2, Padding, Row, Text } from "@zextras/carbonio-design-system"
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
                            <Container orientation="horizontal" mainAlignment="space-between" padding="medium">
                                { todo.isCompleted && <Padding right="medium"><Icon icon="Checkmark" size={"large"} color="success" /></Padding>}
                                    <Accordion items={[
                                    {
                                        id: todo.id,
                                        label: todo.id + '. ' + todo.label,
                                        items: todo.items.map((subtask) => ({
                                            id: subtask.id,
                                            label: subtask.label
                                        }))
                                    }
                                ]} />
                                <Link to={`/todos/${todo.id}`} style={{ textDecoration: 'none' }}>
                                    <Icon icon={"ArrowIosForwardOutline"} size={"large"} />
                                </Link>
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