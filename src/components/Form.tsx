import { Button, Container, Input, InputProps } from "@zextras/carbonio-design-system"
import { useCallback, useEffect, useState } from "react";

interface FormProps {
    defaultInputValue: string;
    handleConfirmCallback: (value: string) => void;
    buttonLabel: string;
}

export const Form: React.FC<FormProps> = ({
    defaultInputValue,
    handleConfirmCallback,
    buttonLabel
}) => {

    const [inputValue, setInputValue] = useState<string>(defaultInputValue)

    useEffect(() => {
        setInputValue(defaultInputValue)
    }, [defaultInputValue])

    const inputChangeHandler = useCallback<NonNullable<InputProps["onChange"]>>((e) => {
        setInputValue(e.target.value)
    }, [setInputValue])
    
    const handlerConfirm = useCallback(() => {
        handleConfirmCallback(inputValue)
        setInputValue("")
    }, [inputValue, handleConfirmCallback])

    return (
        <Container background={"gray5"} orientation="horizontal">
            <Input
                value={inputValue}
                onChange={inputChangeHandler}
                onEnter={handlerConfirm}
                placeholder="Add a new task..."
            />
            <Button
                type="outlined"
                width="fit"
                minWidth="fit-content"
                label={buttonLabel}
                onClick={handlerConfirm}
            />
        </Container>
    )
}