import { Accordion, Container, Divider } from "@zextras/carbonio-design-system"
import { useNavigate } from "react-router-dom";
import { CheckboxComponent } from "../Accordions/CheckboxComponent";
import { ChildCustomComponent } from "../Accordions/ChildCustomComponent";
import { useCallback } from "react";

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
    items: Subtask[];
}

interface TodoListAccordionSectionProps {
    todo: Todo;
}

export const TodoListAccordionSection: React.FC<TodoListAccordionSectionProps> = ({
    todo,
}) => {

    const navigate = useNavigate()

    const goToDetail = useCallback(() => {
        navigate("/todos/" + todo.id)
    }, [navigate, todo.id])

    const items = [
        {
            id: todo.id,
            label: todo.label,
            onClick: goToDetail,
            badgeCounter: todo.items.length,
            CustomComponent: CheckboxComponent,
            items: todo.items.map((subtask) => ({
                id: subtask.id,
                label: subtask.label,
                CustomComponent: ChildCustomComponent,
            }))
        }
    ];

    return (
        <>
            <Container orientation="horizontal">
                <Accordion items={items} />
            </Container>
            <Divider style={{ width: "95%", margin: "auto" }} />
        </>
    )
}