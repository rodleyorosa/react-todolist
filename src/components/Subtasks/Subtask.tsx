import { Button, Container, Input, Padding, Text } from "@zextras/carbonio-design-system"
import { SubtaskList } from "./SubtaskList";

interface ItemProps {
    id: string;
    label: string;
}

interface SubtaskProps {
    addSubtask: (id: string, label: string) => void;
    id: string;
    subtaskInputValue: string;
    setSubtaskInputValue: (e: string) => void;
    subtasks: ItemProps[];
    deleteSubtask: (todoId: string, subtaskId: string) => void
}

export const Subtask: React.FC<SubtaskProps> = ({
    addSubtask,
    id,
    subtaskInputValue,
    setSubtaskInputValue,
    subtasks,
    deleteSubtask
}) => {
    return (
        <Padding vertical={"50px"} width="fill">
            <Text size={"extralarge"}>Subtasks:</Text>
            <Container orientation="horizontal">
                <Input
                    value={subtaskInputValue}
                    onChange={(e) => setSubtaskInputValue(e.target.value)}
                    onEnter={() => addSubtask(id, subtaskInputValue)}
                />
                <Button minWidth="fit-content" label="Add" onClick={() => addSubtask(id, subtaskInputValue)} />
            </Container>
            <SubtaskList subtasks={subtasks} todoId={id} deleteSubtask={deleteSubtask}/>
        </Padding>
    )
}