import { Padding } from "@zextras/carbonio-design-system";

interface ChildCustomComponentProps {
    item: any
}

export const ChildCustomComponent: React.FC<ChildCustomComponentProps> = ({ item }) => {
    return (
        <Padding all={"20px"}>
            {item.label}
        </Padding>
    )
}
