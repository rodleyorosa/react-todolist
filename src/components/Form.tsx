import { Button, Container, Input, InputProps } from "@zextras/carbonio-design-system"
import { useCallback } from "react";

interface FormProps {
    inputValue: string;
    setInputValue: (e: string) => void;
    addTodo: () => void;
}

export const Form: React.FC<FormProps> = ({ inputValue, setInputValue, addTodo }) => {

    const inputChangeHandler = useCallback<NonNullable<InputProps["onChange"]>>((e) => {
        setInputValue(e.target.value)
    }, [setInputValue])

    return (
        <Container background={"gray5"} orientation="horizontal">
            <Input
                value={inputValue}
                onChange={inputChangeHandler}
                onEnter={addTodo}
            />
            <Button
                type="outlined"
                width="fit"
                minWidth="fit-content"
                label="Add"
                onClick={addTodo}
            />
        </Container>
    )
}