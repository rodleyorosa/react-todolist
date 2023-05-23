import { ByRoleMatcher, ByRoleOptions, GetAllBy, RenderOptions, RenderResult, queries, queryHelpers, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { filter } from "lodash";
import { ReactElement } from "react";
import { StyledWrapper } from "../providers/StyledWrappers";
import { ManagersProvider } from "../providers/ProvidersWrapper";

export type UserEvent = ReturnType<(typeof userEvent)['setup']> & {
    readonly rightClick: (target: Element) => Promise<void>;
};

const queryAllByTextWithMarkup: GetAllBy<[string | RegExp]> = (container, text) =>
    screen.queryAllByText((_content, element) => {
        if (element && element instanceof HTMLElement) {
            const hasText = (singleNode: Element): boolean => {
                const regExp = RegExp(text);
                return singleNode.textContent != null && regExp.test(singleNode.textContent);
            };
            const childrenDontHaveText = Array.from(element.children).every((child) => !hasText(child));
            return hasText(element) && childrenDontHaveText;
        }
        return false;
    });

const getByTextWithMarkupMultipleError = (
    container: Element | null,
    text: string | RegExp
): string => `Found multiple elements with text: ${text}`;
const getByTextWithMarkupMissingError = (
    container: Element | null,
    text: string | RegExp
): string => `Unable to find an element with text: ${text}`;

type ByRoleWithIconOptions = ByRoleOptions & {
    icon: string | RegExp;
};

const queryAllByRoleWithIcon: GetAllBy<[ByRoleMatcher, ByRoleWithIconOptions]> = (
    container,
    role,
    { icon, ...options }
) =>
    filter(
        screen.queryAllByRole('button', options),
        (element) => within(element).queryByTestId(icon) !== null
    );

const getByRoleWithIconMultipleError = (
    container: Element | null,
    role: ByRoleMatcher,
    options: ByRoleWithIconOptions
): string => `Found multiple elements with role ${role} and icon ${options.icon}`;
const getByRoleWithIconMissingError = (
    container: Element | null,
    role: ByRoleMatcher,
    options: ByRoleWithIconOptions
): string => `Unable to find an element with role ${role} and icon ${options.icon}`;

const [
    queryByTextWithMarkup,
    getAllByTextWithMarkup,
    getByTextWithMarkup,
    findAllByTextWithMarkup,
    findByTextWithMarkup
] = queryHelpers.buildQueries<[string | RegExp]>(
    queryAllByTextWithMarkup,
    getByTextWithMarkupMultipleError,
    getByTextWithMarkupMissingError
);

const [
    queryByRoleWithIcon,
    getAllByRoleWithIcon,
    getByRoleWithIcon,
    findAllByRoleWithIcon,
    findByRoleWithIcon
] = queryHelpers.buildQueries<[ByRoleMatcher, ByRoleWithIconOptions]>(
    queryAllByRoleWithIcon,
    getByRoleWithIconMultipleError,
    getByRoleWithIconMissingError
);

const customQueries = {
    // byTextWithMarkup
    queryByTextWithMarkup,
    getAllByTextWithMarkup,
    getByTextWithMarkup,
    findAllByTextWithMarkup,
    findByTextWithMarkup,
    // byRoleWithIcon
    queryByRoleWithIcon,
    getAllByRoleWithIcon,
    getByRoleWithIcon,
    findAllByRoleWithIcon,
    findByRoleWithIcon
};

interface WrapperProps {
    children?: React.ReactNode | undefined;
    initialRouterEntries?: string[];
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => (
    <StyledWrapper>
        <ManagersProvider>{children}</ManagersProvider>
    </StyledWrapper>
);

function customRender(
    ui: React.ReactElement,
    {
        initialRouterEntries = ['/'],
        ...options
    }: WrapperProps & {
        options?: Omit<RenderOptions, 'queries' | 'wrapper'>;
    } = {}
): RenderResult<typeof queries & typeof customQueries> {
    return render(ui, {
        wrapper: ({ children }: Pick<WrapperProps, 'children'>) => (
            <Wrapper initialRouterEntries={initialRouterEntries}>
                {children}
            </Wrapper>
        ),
        queries: { ...queries, ...customQueries },
        ...options
    });
}

type SetupOptions = Pick<WrapperProps, 'initialRouterEntries'> & {
    renderOptions?: Omit<RenderOptions, 'queries'>;
    setupOptions?: Parameters<(typeof userEvent)['setup']>[0];
};

const setupUserEvent = (options: SetupOptions['setupOptions']): UserEvent => {
    const user = userEvent.setup(options);
    const rightClick = (target: Element): Promise<void> =>
        user.pointer({ target, keys: '[MouseRight]' });

    return {
        ...user,
        rightClick
    };
};

export const setup = (
    ui: ReactElement,
    options?: SetupOptions
): { user: UserEvent } & ReturnType<typeof customRender> => ({
    user: setupUserEvent({ advanceTimers: jest.advanceTimersByTime, ...options?.setupOptions }),
    ...customRender(ui, {
        initialRouterEntries: options?.initialRouterEntries,
        ...options?.renderOptions
    })
});