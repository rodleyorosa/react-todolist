import { IconButton, Text } from "@zextras/carbonio-design-system"

interface SelectionNotActiveProps {
    toggleSelection: () => void;
}

export const SelectionNotActive: React.FC<SelectionNotActiveProps> = ({
    toggleSelection
}) => {
    return (
        <>
            <IconButton
                icon="CheckmarkSquare"
                iconColor="primary"
                size="large"
                onClick={toggleSelection}
            />
            <Text>Attiva modalità di selezione</Text>
        </>
    )
} 