// @flow
import React from 'react';
import styled from '@emotion/styled';
import { Button, Text } from '@emulous/prototype';
import type { TId } from '@emulous/types';

import RefreshIconSvg from './icon/refresh.svg';
import DeleteIconSvg from './icon/delete.svg';

type TProps = $ReadOnly<{|
	onChange: string => void,
	src: string,
	name?: ?string,
	imageId?: TId,
	onRemove?: ?(TId) => void,
	onShowAttr?: (MouseEvent, string) => void,
|}>;

const Cover = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: 4px;
	background: ${({ theme }) => theme.colors.spec.darkblue70};
	opacity: 0.5;
	z-index: 1;
`;

const Refresh = styled(Button)`
	z-index: 2;
`;

const Delete = styled(Button)`
	position: absolute;
	z-index: 2;
	right: 3px;
	top: 3px;
`;

const Label = styled(Text)`
	position: absolute;
	bottom: 3px;
	right: 6px;
	left: 6px;
	color: #ffffff;
	text-align: center;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	z-index: 2;
	transition: 'opacity 0.3s ease-in';
	${({ isShowAttr }) =>
		isShowAttr ? '&:hover { opacity: 0.8 }' : 'pointer-events: none;'};
`;

const Control = styled.div`
	position: absolute;
	display: flex;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	justify-content: center;
	align-items: center;
	opacity: 0;
	cursor: pointer;
	transition-property: opacity;
	transition-timing-function: ease-out;
	transition-duration: 0.25s;

	&:hover {
		opacity: 1;
	}
`;

const Controls = (props: TProps) => {
	const {
		src,
		name,
		onChange,
		imageId = null,
		onRemove = null,
		onShowAttr = null,
	} = props;

	const changeImage = React.useCallback(() => {
		onChange(src);
	}, [onChange, src]);

	const removeImage = React.useCallback(() => {
		if (onRemove && imageId) onRemove(imageId);
	}, [onRemove, imageId]);

	const handleShowAttr = React.useCallback(
		e => {
			if (onShowAttr && imageId) onShowAttr(e, imageId);
		},
		[onShowAttr, imageId],
	);

	return (
		<Control>
			<Cover onClick={changeImage} />
			<Refresh variant="whiteghost.iconrounded.md" onClick={changeImage}>
				<RefreshIconSvg />
			</Refresh>
			{onRemove && (
				<Delete variant="whiteflat.icon.sm" onClick={removeImage}>
					<DeleteIconSvg />
				</Delete>
			)}
			{name && (
				<Label
					variant="captionmd"
					onClick={handleShowAttr}
					isShowAttr={onShowAttr && imageId}
				>
					{name}
				</Label>
			)}
		</Control>
	);
};

export default React.memo<TProps>(Controls);
