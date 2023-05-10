import { Button, Container, IconButton } from "@zextras/carbonio-design-system";
import { useContext } from "react";
import { CheckboxContext } from "../../App";

interface SelectionActiveProps {
    toggleSelection: () => void;
}

interface ContextProps {
    selectedTasks: string[];
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>
    handleDeleteSelectedTasks: () => void;
}

export const SelectionActive: React.FC<SelectionActiveProps> = ({
    toggleSelection,
}) => {

    const { selectedTasks, handleDeleteSelectedTasks } = useContext<ContextProps>(CheckboxContext)

    return (
        <Container orientation="horizontal">
            <Container orientation="horizontal" mainAlignment="flex-start">
                <IconButton
                    icon="ArrowBack"
                    iconColor="primary"
                    size="large"
                    onClick={toggleSelection}
                />
                <Button
                    size="large"
                    color="primary"
                    type="ghost"
                    label="SELEZIONA TUTTI"
                    onClick={() => { }}
                />
            </Container>
            {selectedTasks.length > 0 &&
                <>
                    <IconButton icon={"DoneAll"} onClick={() => { }} size="large" />
                    <IconButton icon={"Trash2Outline"} onClick={handleDeleteSelectedTasks} size="large" />
                </>
            }
        </Container>
    );
};
