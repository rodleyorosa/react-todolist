import { Container, Padding, Text } from "@zextras/carbonio-design-system"
import { Link, Outlet } from "react-router-dom"

export const Root = () => {

    return (
        <Container>
            <Padding vertical={"extralarge"}>
                <Text size="extralarge" weight={"bold"}>
                    REACT TODO APPLICATION
                </Text>
            </Padding>
            <Padding bottom={"extralarge"}>
                <Link to="/todos">todos</Link>
            </Padding>
            <Outlet />
        </Container>
    )
}