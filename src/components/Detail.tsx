import { Button } from "@zextras/carbonio-design-system";
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { Subtask } from "./Subtasks/Subtask";
import { DetailContainer } from "./Detail/DetailContainer";
import { todoStore } from "../store";

interface DetailProps {
    subtaskInputValue: string;
    setSubtaskInputValue: (e: string) => void;
    deleteSubtask: (todoId: string, subtaskId: string) => void
}

const ContainerDetail = styled.div`
    width: 350px;
    background-color: #f5f6f8;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px
`
const ContainerBtn = styled.div`
    display: flex;
    gap: 10px;
`

export const Detail: React.FC<DetailProps> = ({
    subtaskInputValue,
    setSubtaskInputValue,
    deleteSubtask
}) => {

    const { todos, completeTodo, deleteTodo } = todoStore((state) => state)

    const { id } = useParams()
    const todo = todos.find(todo => todo.id === id)
    if (!todo) {
        return <h2>Task not found</h2>
    }
    
    const handleCompleteTodo = () => {
        completeTodo(todo.id)
    }

    const handleDeleteTodo = () => {
       deleteTodo(todo.id)
    }

    return (
        <ContainerDetail>
            <DetailContainer
                todo={todo}
            />
            <Subtask
                id={todo.id}
                subtaskInputValue={subtaskInputValue}
                setSubtaskInputValue={setSubtaskInputValue}
                subtasks={todo.items}
                deleteSubtask={deleteSubtask}
            />
            <ContainerBtn>
                <Button
                    width={"fill"}
                    minWidth={"fit-content"}
                    label={todo.isCompleted ? "Undone" : "Done"}
                    color="success"
                    onClick={handleCompleteTodo}
                />
                <Button
                    width={"fill"}
                    minWidth={"fit-content"}
                    label="Delete"
                    color="error"
                    onClick={handleDeleteTodo}
                />
            </ContainerBtn>
        </ContainerDetail>
    )
}