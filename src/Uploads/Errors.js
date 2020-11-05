// @flow
import React from 'react';
import styled from '@emotion/styled';
import { Box, Text } from '@emulous/prototype';

import type { TImageLibraryErrors } from '@emulous/types';

type TProps = $ReadOnly<{|
	t: (string, ?{ count: number }) => string,
	numberOfFiles: number,
	messageType: TImageLibraryErrors,
|}>;

const Wrap = styled(Box)`
	margin-top: 24px;
	padding: 18px;
	background: ${({ theme }) => theme.colors.bg.primaryalt};
	border-radius: 4px;
`;

const TextStyled = styled(Text)`
	margin-bottom: 12px;
`;

const Empty = (props: TProps) => {
	const { t, numberOfFiles, messageType } = props;

	return (
		<Wrap>
			<TextStyled variant="bodysm" color="text.error">
				{`${numberOfFiles} ${t('file', { count: numberOfFiles })} ${t(
					'not uploaded',
				)}`}
			</TextStyled>
			<Text variant="bodysm" color="text.primary">
				{messageType === 'size' && t('Please use files less than 20 MB')}
				{messageType === 'format' &&
					/* $FlowFixMe(>=0.102.0) ну типа двоеточие нужно тут
					 * */
					t('Allowed file extensions: jpg, png, svg, webp or gif', {
						keySeparator: '>',
						nsSeparator: '|',
					})}
				{messageType === 'limit' && t('Maximum 20 files allowed')}
			</Text>
		</Wrap>
	);
};

export default React.memo<TProps>(Empty);
