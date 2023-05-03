import { Button, Input, Row, Text } from "@zextras/carbonio-design-system";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { Subtask } from "./Subtask";

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

interface DetailProps {
    todos: Todo[];
    completeTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    addSubtask: (id: string, subtaskText: string) => void;
    subtaskInputValue: string;
    setSubtaskInputValue: (e: string) => void; 
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

export const Detail: React.FC<DetailProps> = ({
    todos,
    completeTodo,
    deleteTodo,
    addSubtask, subtaskInputValue, setSubtaskInputValue
}) => {

    const { id } = useParams()
    const todo = todos.find(todo => todo.id === id)
    if (!todo) {
        return <h2>Task not found</h2>
    }


    return (
        <ContainerDetail>
            <div>
                <Row mainAlignment="space-between">
                    <Text size={"extralarge"} weight={"bold"}>Task {todo.id}:</Text>
                </Row>
                <Text>{todo.label}</Text>
                <Text>Created: {todo.createdDate.toLocaleString()}</Text>
                <Text>Completed: {todo.isCompleted ? todo.completedDate?.toLocaleString() : "Not done"}</Text>
            </div>
            <Subtask addSubtask={addSubtask} id={todo.id} subtaskInputValue={subtaskInputValue} setSubtaskInputValue={setSubtaskInputValue} />
            <ContainerBtn>
                <Button
                    width={"fill"}
                    minWidth={"fit-content"}
                    label={todo.isCompleted ? "Undone" : "Done"}
                    color="success"
                    onClick={() => completeTodo(todo.id)}
                />
                <Button
                    width={"fill"}
                    minWidth={"fit-content"}
                    label="Delete"
                    color="error"
                    onClick={() => deleteTodo(todo.id)}
                />
            </ContainerBtn>
        </ContainerDetail>
    )
}