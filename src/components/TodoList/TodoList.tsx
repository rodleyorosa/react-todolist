import { useMemo } from "react";
import { TodoListAccordionSection } from "./TodoListAccordionSection";
import { Container, ListItem, ListV2 } from "@zextras/carbonio-design-system";

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
}

export const TodoList: React.FC<TodoListProps> = ({
    todos,
}) => {

    const items = useMemo(
        () =>
            todos.map((todo) => (
                <ListItem key={todo.id}>
                    {() => (
                        <TodoListAccordionSection
                            todo={todo}
                        />
                    )}
                </ListItem>
            )), [todos]
    )

    return (
        <Container borderColor={"gray3"} height={"50vh"} orientation="vertical">
            <ListV2>{items}</ListV2>
        </Container>
    )
}