import { Button, IconButton } from "@zextras/carbonio-design-system"

interface SelectionActiveProps {
    toggleSelection: () => void;
}

export const SelectionActive: React.FC<SelectionActiveProps> = ({
    toggleSelection
}) => {
    return (
        <>
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
        </>
    )
}