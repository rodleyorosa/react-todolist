import { Modal, Text } from "@zextras/carbonio-design-system"
import { useContext } from "react";
import { CheckboxContext } from "../../App";

interface ContextProps {
    selectedTasks: string[];
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>
    handleDeleteSelectedTasks: () => void;
    handleCompleteSelectedTasks: () => void;
    isSelectionActive: boolean;
    setIsSelectionActive: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: boolean;
    closeModalHandler: () => void;
    clickModalHandler: () => void
}

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

interface ModalComponentProps {
    todos: Todo[]
}

export const ModalComponent: React.FC<ModalComponentProps> = ({
    todos
}) => {
    const { openModal, closeModalHandler } = useContext<ContextProps>(CheckboxContext)

    return (
        <Modal
            onSecondaryAction={() => { }}
            title="Select a valid task"
            open={openModal}
            onConfirm={closeModalHandler}
            onClose={closeModalHandler}
            showCloseIcon={true}
        >
            {todos.map(todo => {
                return (
                    <Text key={todo.id} onClick={() => { console.log(todo.id) }}>
                        {todo.label}
                    </Text>
                )
            })}

        </Modal>
    )
}