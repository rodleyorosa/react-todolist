import { Accordion, AccordionItemType, Container, Divider } from "@zextras/carbonio-design-system"
import { CheckboxComponent } from './Accordions/CheckboxComponent'
import { ChildCustomComponent } from "./Accordions/ChildCustomComponent";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

interface Todo {
    id: string;
    label: string;
    isCompleted: boolean;
    createdDate: Date;
    completedDate?: Date;
    items: Todo[];
}

interface ListAccordionProps {
    data: Todo
}

export const ListAccordion:React.FC<ListAccordionProps> = ({
    data
}) => {

    const navigate = useNavigate()

    const goToDetail = useCallback(() => {
        navigate(`/todos/${data.id}`)
    }, [navigate, data.id])

    const items: Array<AccordionItemType> = [
        {
            id: data.id,
            label: data.label,
            onClick: goToDetail,
            CustomComponent: CheckboxComponent,
            items: data.items.map((subtask) => ({
                id: subtask.id,
                label: subtask.label,
                CustomComponent: ChildCustomComponent
            }))
        }
    ]

    return (
        <>
            <Container orientation="horizontal">
                <Accordion items={items} />
            </Container>
            <Divider style={{ width: "95%", margin: "auto" }} />
        </>
    )
}