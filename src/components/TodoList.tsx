import { Accordion, Badge, Checkbox, Container, Divider, IconButton, ListItem, ListV2, Padding, Text } from "@zextras/carbonio-design-system"
import { useMemo } from "react"
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

interface CustomComponentProps {
    item: any
}

export const TodoList: React.FC<TodoListProps> = ({
    todos,
    isSelectionActive
}) => {

    const navigate = useNavigate()

    const CheckboxComponent: React.FC<CustomComponentProps> = ({ item }) => (
        <Container orientation="horizontal" mainAlignment="space-between" padding={"10px"} crossAlignment="center">
            <Container orientation="horizontal" mainAlignment="flex-start">
                {isSelectionActive ?
                    <Checkbox padding={"10px"} />
                    :
                    <IconButton size="extralarge" icon="InstanceOutline" borderRadius="round" onClick={() => { }} />
                }
                <Text>{item.label}</Text>
            </Container>
            {item.badgeCounter ?
                <Badge value={item.badgeCounter} type={item.badgeType} />
                :
                null
            }
        </Container>
    )

    const ChildCustomComponent: React.FC<CustomComponentProps> = ({ item }) => (
        <Padding all={"20px"}>
            {item.label}
        </Padding>
    )

    const items = useMemo(
        () =>
            todos.map((todo) => (
                <ListItem key={todo.id}>
                    {() => (
                        <>
                            <Container orientation="horizontal">
                                <Accordion
                                    items={[
                                        {
                                            id: todo.id,
                                            label: todo.label,
                                            badgeType: 'unread',
                                            badgeCounter: todo.items.length,
                                            onClick: () => navigate("/todos/" + todo.id),
                                            CustomComponent: CheckboxComponent,
                                            items: todo.items.map((subtask) => ({
                                                id: subtask.id,
                                                label: subtask.label,
                                                CustomComponent: ChildCustomComponent,
                                            }))
                                        }
                                    ]} />
                            </Container>
                            <Divider style={{ width: "95%", margin: "auto" }} />
                        </>
                    )}
                </ListItem>
            )), [todos, CheckboxComponent, navigate]
    )

    return (
        <Container borderColor={"gray3"} height={"50vh"} orientation="vertical">
            <ListV2>{items}</ListV2>
        </Container>
    )
}