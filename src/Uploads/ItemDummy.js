// @flow
import React from 'react';
import styled from '@emotion/styled';
import { Box, LoaderIcon } from '@emulous/prototype';

type TProps = $ReadOnly<{||}>;

const Wrap = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.bg.primaryalt};

	&:before {
		content: '';
		padding-bottom: 100%;
		display: block;
	}
`;

const Dummy = () => {
	return (
		<Wrap>
			<LoaderIcon color="bg.accent" size={36} />
		</Wrap>
	);
};

export default React.memo<TProps>(Dummy);
