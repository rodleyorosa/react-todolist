import { IconButton, Text } from "@zextras/carbonio-design-system"
import { useContext } from "react"
import { CheckboxContext } from "../../App"

export const SelectionNotActive: React.FC = () => {
    const {toggleSelection} = useContext(CheckboxContext)

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