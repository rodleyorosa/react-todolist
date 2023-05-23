import {
    AccordionItemType,
    Badge,
    Checkbox,
    Container,
    IconButton,
    Text,
} from "@zextras/carbonio-design-system";
import { useCallback, useContext, useState } from "react";
import { CheckboxContext } from "../../App";
import styled from "styled-components";

const TextCompleted = styled.div`
    text-decoration: line-through
`

interface CustomComponentProps {
    item: AccordionItemType & { isCompleted?: boolean };
}

interface ContextProps {
    selectedTasks: string[];
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>;
    handleDeleteSelectedTasks: () => void;
    handleCompleteSelectedTasks: () => void;
    isSelectionActive: boolean;
    setIsSelectionActive: React.Dispatch<React.SetStateAction<boolean>>;
    toggleSelection: () => void;
}

export const CheckboxComponent: React.FC<CustomComponentProps> = ({ item }) => {
    const [checked, setChecked] = useState<boolean>(false);

    const { isSelectionActive, setSelectedTasks } = useContext<ContextProps>(CheckboxContext)

    const handleCheckbox = useCallback(() => {
        setChecked((prev) => !prev);

        if (!checked) {
            setSelectedTasks(prev => [...prev, item.id]);
        } else {
            setSelectedTasks(prev => prev.filter(id => id !== item.id));
        }
    }, [checked, item.id, setSelectedTasks])

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
                {item.isCompleted ?
                    <TextCompleted>{item.label}</TextCompleted>
                    :
                    <Text>{item.label}</Text>
                }
            </Container>
            {item.badgeCounter ? (
                <Badge value={item.badgeCounter} type={item.isCompleted ? "read" : "unread"} />
            ) : null}
        </Container>
        
    );
};
