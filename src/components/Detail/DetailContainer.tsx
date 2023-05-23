import { Container, Icon, Padding, Text } from "@zextras/carbonio-design-system"
import { Link } from "react-router-dom"
import { todoStore } from "../../store";
import { useCallback, useState } from "react";
import { Form } from "../Form";

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
}

export const DetailContainer: React.FC<DetailContainerProps> = ({
    todo,
}) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)

    const { editTodo } = todoStore((state) => state)

    const toggleEdit = useCallback(() => {
        setIsEdit(prev => !prev)
    }, [])

    const handleEditTodo = useCallback((value: string) => {
        editTodo(todo.id, value)
        setIsEdit(false)
    }, [editTodo, setIsEdit, todo.id])

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
                    <Text onClick={toggleEdit}>{todo.label}</Text> :
                    <Form
                        defaultInputValue={todo.label}
                        handleConfirmCallback={handleEditTodo}
                        buttonLabel="Edit"
                    />
                }
            </Padding>
            <Text>Created: {todo.createdDate.toLocaleString()}</Text>
            <Text>Completed: {todo.isCompleted ? todo.completedDate?.toLocaleString() : "Not done"}</Text>
        </Container>
    )
}