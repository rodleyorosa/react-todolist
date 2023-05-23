import { Container, ListItem, ListV2 } from "@zextras/carbonio-design-system"
import { useMemo } from "react"
import { ListAccordion } from "./ListAccordion";

interface DataProps {
    id: string;
    label: string;
    isCompleted: boolean;
    createdDate: Date;
    completedDate?: Date;
    items: DataProps[]
}

interface ListProps{
    datas: DataProps[]
}

export const List: React.FC<ListProps> = ({
    datas
}) => {

    const items = useMemo(
        () =>
        datas.map((data) => (
            <ListItem key={data.id}>
                {() => (
                    <ListAccordion data={data} />
                )}
            </ListItem>
        )), [datas]
    )

    return (
        <Container borderColor={"gray3"} height={"50vh"} orientation="vertical">
            <ListV2>{items}</ListV2>
        </Container>
        )
}