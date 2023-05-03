import { Container, Divider, Icon, ListItem, ListV2, Row, Text } from "@zextras/carbonio-design-system"
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
                                <Row minWidth={"0"} display="flex" mainAlignment="space-between" width={"100%"}>
                                    <Row gap="10px">
                                        {todo.id}.
                                        <Text overflow={"break-word"}>{todo.isCompleted ? <s>{todo.label}</s> : todo.label}</Text>
                                        {todo.isCompleted ? <Icon icon={"Checkmark"} size={"large"} color="green" /> : null}
                                    </Row>
                                    <Icon icon={"ArrowIosForwardOutline"} size={"large"} />
                                </Row>
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