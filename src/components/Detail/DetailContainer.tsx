import { Container, Icon, Input, Padding, Text } from "@zextras/carbonio-design-system"
import { Link } from "react-router-dom"

interface SubtaskProps {
    id: string;
    label: string;
}

interface Todo {
    id: string;
    label: string;
    isCompleted: boolean;
    createdDate: Date;
    completedDate?: Date;
    items: SubtaskProps[];
}

interface DetailContainerProps {
    todo: Todo;
    isEdit: boolean;
    toggleEdit: (todoText: string) => void;
    editTodo: (id: string, newText: string) => void;
    newInputValue: string;
    setNewInputValue: (e: string) => void;
}

export const DetailContainer: React.FC<DetailContainerProps> = ({
    todo,
    isEdit,
    toggleEdit,
    editTodo,
    newInputValue,
    setNewInputValue
}) => {

    return (
        <Container crossAlignment="flex-start">
            <Container orientation="horizontal" mainAlignment="space-between">
                <Text size={"extralarge"} weight={"bold"}>Task {todo.id}:</Text>
                <Link to="/todos">
                    <Icon icon="Close" size={"large"} />
                </Link>
            </Container>
            <Padding vertical={"20px"} width="100%">
                {!isEdit ?
                    <Text onClick={() => toggleEdit(todo.label)}>{todo.label}</Text> :
                    <Input
                        onBlur={() => editTodo(todo.id, newInputValue)}
                        value={newInputValue}
                        onChange={(e) => setNewInputValue(e.target.value)}
                        onEnter={() => editTodo(todo.id, newInputValue)}
                    />
                }
            </Padding>
            <Text>Created: {todo.createdDate.toLocaleString()}</Text>
            <Text>Completed: {todo.isCompleted ? todo.completedDate?.toLocaleString() : "Not done"}</Text>
        </Container>
    )
}