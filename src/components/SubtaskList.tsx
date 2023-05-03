import { Container, ListItem, ListV2 } from "@zextras/carbonio-design-system";
import { useMemo } from "react";

interface Subtask {
    id: string;
    label: string;
}

interface SubtaskListProps {
    subtasks: Subtask[]
}

export const SubtaskList: React.FC<SubtaskListProps> = ({subtasks}) => {
    const items = useMemo(
        () =>
            subtasks.map((item) => (
                <ListItem key={item.id}>
                    {() => (
                        <>{item.label}</>
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