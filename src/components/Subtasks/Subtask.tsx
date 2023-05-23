import { Container, Padding, Text } from "@zextras/carbonio-design-system"
import { useCallback } from "react";
import { Form } from "../Form";
import { List } from "../List";

interface Todo {
    id: string;
    label: string;
    isCompleted: boolean;
    createdDate: Date;
    completedDate?: Date;
    items: Todo[];
}

interface SubtaskProps {
    id: string;
    subtaskInputValue: string;
    setSubtaskInputValue: (e: string) => void;
    subtasks: Todo[];
    deleteSubtask: (todoId: string, subtaskId: string) => void
}

export const Subtask: React.FC<SubtaskProps> = ({
    subtasks,
}) => {

    const handleAddSubtask = useCallback((subtaskText: string) => {
        // addTodo()
    }, [])

    return (
        <Padding vertical={"50px"} width="fill">
            <Text size={"extralarge"}>Subtasks:</Text>
            <Container orientation="horizontal">
                <Form
                    buttonLabel="Add"
                    defaultInputValue={""}
                    handleConfirmCallback={handleAddSubtask}
                />
            </Container>
            <List
                datas={subtasks}
            />
        </Padding>
    )
}