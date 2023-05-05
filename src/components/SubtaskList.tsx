import { Container, Icon, ListItem, ListV2, Text } from "@zextras/carbonio-design-system";
import { useMemo } from "react";

interface Subtask {
    id: string;
    label: string;
}

interface SubtaskListProps {
    subtasks: Subtask[];
    todoId: string;
    deleteSubtask: (todoId: string, subtaskId: string) => void
}

export const SubtaskList: React.FC<SubtaskListProps> = ({ subtasks, deleteSubtask, todoId }) => {
    const items = useMemo(
        () =>
            subtasks.map((item) => (
                <ListItem key={item.id}>
                    {() => (
                        <Container orientation="horizontal" mainAlignment="space-between">
                            <Text>
                                {item.label}
                            </Text>
                            <Icon icon="Close" size={"large"} onClick={() => deleteSubtask(todoId, item.id)}/>
                        </Container>
                    )}
                </ListItem>
            )),
        [subtasks]
    );

    return (
        <Container height={"200px"}>
            <ListV2>{items}</ListV2>
        </Container>
    )
}