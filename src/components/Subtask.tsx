import { Button, Container, Input, Text } from "@zextras/carbonio-design-system"

interface SubtaskProps {
    addSubtask: (id: string, label: string) => void;
    id: string;
    subtaskInputValue: string;
    setSubtaskInputValue: (e: string) => void;
}

export const Subtask: React.FC<SubtaskProps> = ({ addSubtask, id, subtaskInputValue, setSubtaskInputValue }) => {
    return (
        <div>
            <Text size={"extralarge"}>Subtasks:</Text>
            <Container orientation="horizontal">
                <Input
                    value={subtaskInputValue}
                    onChange={(e) => setSubtaskInputValue(e.target.value)}
                    onEnter={() => addSubtask(id, subtaskInputValue)}
                />
                <Button minWidth="fit-content" label="Add" onClick={() => addSubtask(id, subtaskInputValue)} />
            </Container>
        </div>
    )
}