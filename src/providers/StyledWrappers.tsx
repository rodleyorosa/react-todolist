import React from 'react';

import { ThemeProvider } from '@zextras/carbonio-design-system';

type StyledWrapperProps = {
	children?: React.ReactNode;
};

export const StyledWrapper = ({ children }: StyledWrapperProps): JSX.Element => (
	<ThemeProvider loadDefaultFont={false}>{children}</ThemeProvider>
);
