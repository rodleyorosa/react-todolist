import { Button, Container, Input } from "@zextras/carbonio-design-system"

interface FormProps {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    addTodo: () => void
}

export const Form: React.FC<FormProps> = ({ inputValue, setInputValue, addTodo }) => {
    return (
        <Container background={"gray5"} orientation="horizontal">
            <Input
                value={inputValue}
                onChange={
                    (e) => {
                        setInputValue(e.target.value)
                    }
                }
                onEnter={() => addTodo()} />
            <Button label="Add" onClick={() => addTodo()} />
        </Container>
    )
}