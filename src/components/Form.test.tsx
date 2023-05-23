import { setup } from "../utils/testUtils"
import { screen } from "@testing-library/react"
import { Form } from "./Form"
import '@testing-library/jest-dom'



describe("Form", () => {
    test("should render the input and button elements", () => {
        const handleConfirmCallbackFn = jest.fn();
        setup(<Form
            defaultInputValue=""
            handleConfirmCallback={handleConfirmCallbackFn}
            buttonLabel=""
        />)
        expect(screen.getByRole("textbox")).toBeVisible();
        expect(screen.getByRole("button")).toBeVisible();
    })
})