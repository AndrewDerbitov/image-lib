// @flow
import React from 'react';
import styled from '@emotion/styled';
import { Box, Text } from '@emulous/prototype';

import EmptySvg from '../icon/empty.svg';

type TProps = $ReadOnly<{|
	t: string => string,
	onUpload: () => void,
|}>;

const Wrap = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

const Border = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 202px;
	width: 219px;
	transition-property: opacity;
	transition-timing-function: ease-out;
	transition-duration: 0.25s;

	&:hover {
		cursor: pointer;
		opacity: 75%;
	}
`;

const EmptyStyled = styled(EmptySvg)`
	margin-bottom: 21px;
`;

const TextStyled = styled(Text)`
	margin-bottom: 12px;
`;

const Empty = (props: TProps) => {
	const { t, onUpload } = props;

	return (
		<Wrap>
			<Border onClick={onUpload}>
				<EmptyStyled />
				<TextStyled variant="headlinemd" color="text.primary">
					{t('Choose files to upload')}
				</TextStyled>
				<Text variant="bodysm" color="text.secondary">
					{t('or just drag files here')}
				</Text>
			</Border>
		</Wrap>
	);
};

export default React.memo<TProps>(Empty);