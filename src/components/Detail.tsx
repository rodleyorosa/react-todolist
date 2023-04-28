import { Button, Input, Text } from "@zextras/carbonio-design-system";
import { useParams } from "react-router-dom"
import styled from "styled-components";

interface Todo {
    id: number;
    text: string;
    isCompleted: boolean;
    createdDate: Date;
    completedDate?: Date;
}

interface DetailProps {
    todos: Todo[];
    completeTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const ContainerDetail = styled.div`
    height: 50vh;
    width: 350px;
    background-color: #f5f6f8;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px
`
const ContainerBtn = styled.div`
    display: flex;
    gap: 10px;
`

export const Detail: React.FC<DetailProps> = ({ todos, completeTodo, deleteTodo }) => {
    const { id } = useParams()
    const todo = todos.find(todo => todo.id === Number(id))
    if (!todo) {
        return <h2>Task not found</h2>
    }

    return (
        <ContainerDetail>
            <div>
                <Text size={"extralarge"} weight={"bold"}>Task {todo.id}:</Text>
                <Text>{todo.text}</Text>
                <Text>Created: {todo.createdDate.toLocaleString()}</Text>
                <Text>Completed: {todo.isCompleted ? todo.completedDate?.toLocaleString() : "Not done"}</Text>
            </div>
            <div>
                <Text size={"extralarge"}>Subtasks:</Text>
                <Input />
            </div>
            <ContainerBtn>
                <Button width={"fill"} minWidth={"fit-content"} label={todo.isCompleted ? "Undone" : "Done"} color="success" onClick={() => completeTodo(todo.id)} />
                <Button width={"fill"} minWidth={"fit-content"} label="Delete" color="error" onClick={() => deleteTodo(todo.id)} />
            </ContainerBtn>
        </ContainerDetail>
    )
}