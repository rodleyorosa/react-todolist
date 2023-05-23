import React  from 'react';

// import { ApolloProvider } from '@apollo/client';
import { ModalManager } from '@zextras/carbonio-design-system';

// import buildClient from '../apollo';
// import { SnackbarStackManager } from '../components/SnackbarStackManager';
// import { type OneOrMany } from '../types/utils';
import { StyledWrapper } from './StyledWrappers';
import { OneOrMany } from '../types/utils';

interface ProvidersWrapperProps {
	children?: OneOrMany<React.ReactNode>;
}

export const ManagersProvider = ({ children }: ProvidersWrapperProps): JSX.Element => (
	// <SnackbarStackManager>
		<ModalManager>{children}</ModalManager>
	// </SnackbarStackManager>
);

export const ProvidersWrapper = ({ children }: ProvidersWrapperProps): JSX.Element => {
	// const apolloClient = useMemo(() => buildClient(), []);

	return (
		<StyledWrapper>
			{/* <ApolloProvider client={apolloClient}> */}
				<ManagersProvider>{children}</ManagersProvider>
			{/* </ApolloProvider> */}
		</StyledWrapper>
	);
};
