// @flow
import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@emulous/prototype';
import type { TId } from '@emulous/types';

import Controls from '../Controls';

type TProps = $ReadOnly<{|
	onChange: string => void,
	src: string,
	name: ?string,
	imageId: TId,
	onRemove: TId => void,
|}>;

const Wrap = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.bg.primaryalt};

	:before {
		content: '';
		padding-bottom: 100%;
		display: block;
	}
`;

const Image = styled.img`
	position: absolute;
	max-width: 100%;
	max-height: 100%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Item = (props: TProps) => {
	const { src, name, onChange, imageId, onRemove } = props;

	return (
		<Wrap>
			<Image src={src} />
			<Controls
				onChange={onChange}
				onRemove={onRemove}
				src={src}
				name={name}
				imageId={imageId}
			/>
		</Wrap>
	);
};

export default React.memo<TProps>(Item);
