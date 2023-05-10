import {
    AccordionItemType,
    Badge,
    Checkbox,
    Container,
    IconButton,
    Text,
} from "@zextras/carbonio-design-system";
import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../TodoListContainer";
import { CheckboxContext } from "../../App";

interface CustomComponentProps {
    item: AccordionItemType;
}

interface ContextProps {
    selectedTasks: string[];
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>
    handleDeleteSelectedTasks: () => void;
}

export const CheckboxComponent: React.FC<CustomComponentProps> = ({ item }) => {
    const isSelectionActive = useContext<boolean>(Context);
    const [checked, setChecked] = useState<boolean>(false);

    const {selectedTasks, setSelectedTasks} = useContext<ContextProps>(CheckboxContext)

    const handleCheckbox = useCallback(() => {
        setChecked((prev) => !prev);

        if (!checked) {
            setSelectedTasks(prev => [...prev, item.id]);
        } else {
            setSelectedTasks(prev => prev.filter(id => id !== item.id));
        }
    }, [checked, item.id, setSelectedTasks])

    useEffect(() => {
        console.log(selectedTasks)
    }, [selectedTasks])

    return (
        <Container
            orientation="horizontal"
            mainAlignment="space-between"
            padding={"10px"}
            crossAlignment="center"
        >
            <Container orientation="horizontal" mainAlignment="flex-start">
                {isSelectionActive ? (
                    <Checkbox padding={"10px"} value={checked} onClick={handleCheckbox} />
                ) : (
                    <IconButton
                        size="extralarge"
                        icon="InstanceOutline"
                        borderRadius="round"
                        onClick={() => { }}
                    />
                )}
                <Text>{item.label}</Text>
            </Container>
            {item.badgeCounter ? (
                <Badge value={item.badgeCounter} type="unread" />
            ) : null}
        </Container>
    );
};
