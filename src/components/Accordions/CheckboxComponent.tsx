import { Badge, Checkbox, Container, IconButton, Text } from "@zextras/carbonio-design-system"
import { useContext } from "react"
import { Context } from "../TodoListContainer"

interface CustomComponentProps {
    item: any
}

export const CheckboxComponent: React.FC<CustomComponentProps> = ({ item }) => {

    const isSelectionActive = useContext<boolean>(Context)

    return (
        <Container orientation="horizontal" mainAlignment="space-between" padding={"10px"} crossAlignment="center">
            <Container orientation="horizontal" mainAlignment="flex-start">
                {isSelectionActive ?
                    <Checkbox padding={"10px"} />
                    :
                    <IconButton size="extralarge" icon="InstanceOutline" borderRadius="round" onClick={() => { }} />
                }
                <Text>{item.label}</Text>
            </Container>
            {item.badgeCounter ?
                <Badge value={item.badgeCounter} type="unread" />
                :
                null
            }
        </Container>
    )
}