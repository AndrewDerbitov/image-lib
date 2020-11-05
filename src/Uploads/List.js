// @flow

import React from 'react';
import styled from '@emotion/styled';
import _ from 'lodash/fp';
import { Box } from '@emulous/prototype';
import type { TWidgets, TImageLibraryListUploads, TId } from '@emulous/types';

import Item from './Item';
import ItemDummy from './ItemDummy';

type TProps = $ReadOnly<{|
	onChange: string => void,
	onRemove: TId => void,
	images: TWidgets,
	uploads: ?TImageLibraryListUploads,
|}>;

const Wrap = styled(Box)`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(calc(50% - 24px), 1fr));
	grid-gap: 24px;
	margin-top: 24px;
`;

const List = (props: TProps) => {
	const { images, onChange, onRemove, uploads } = props;

	const uploadingList = React.useMemo(
		() => _.pickBy(file => file.status === 'uploading', uploads || {}),
		[uploads],
	);
	return (
		<Wrap>
			{Object.keys(images).map(id => {
				const { src, name } = images[id];

				return (
					src && (
						<Item
							key={id}
							imageId={id}
							src={src}
							name={name}
							onChange={onChange}
							onRemove={onRemove}
						/>
					)
				);
			})}
			{Object.keys(uploadingList).map(id => (
				<ItemDummy key={id} />
			))}
		</Wrap>
	);
};

export default React.memo<TProps>(List);
