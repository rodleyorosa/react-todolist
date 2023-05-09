import { Button } from "@zextras/carbonio-design-system";
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { Subtask } from "./Subtasks/Subtask";
import { DetailContainer } from "./Detail/DetailContainer";

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
    items: SubtaskProps[]
}

interface DetailProps {
    todos: Todo[];
    completeTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    addSubtask: (id: string, subtaskText: string) => void;
    subtaskInputValue: string;
    setSubtaskInputValue: (e: string) => void;
    editTodo: (id: string, newText: string) => void;
    inputValue: string;
    setInputValue: (e: string) => void;
    isEdit: boolean;
    setIsEdit: (e: boolean) => void;
    toggleEdit: (todoText: string) => void;
    newInputValue: string;
    setNewInputValue: (e: string) => void;
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
    todos,
    completeTodo,
    deleteTodo,
    addSubtask,
    subtaskInputValue,
    setSubtaskInputValue,
    editTodo,
    isEdit,
    toggleEdit,
    newInputValue,
    setNewInputValue,
    deleteSubtask
}) => {

    const { id } = useParams()
    const todo = todos.find(todo => todo.id === id)
    if (!todo) {
        return <h2>Task not found</h2>
    }

    return (
        <ContainerDetail>
            <DetailContainer
                todo={todo}
                isEdit={isEdit}
                toggleEdit={toggleEdit}
                editTodo={editTodo}
                newInputValue={newInputValue}
                setNewInputValue={setNewInputValue}
            />
            <Subtask
                addSubtask={addSubtask}
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