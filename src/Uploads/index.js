// @flow
import React from 'react';
import _ from 'lodash/fp';

import type {
	TWidgets,
	TImageLibraryListUploads,
	TId,
	TImageLibraryErrors,
} from '@emulous/types';

import Empty from './Empty';
import List from './List';
import Errors from './Errors';

type TProps = $ReadOnly<{|
	t: string => string,
	onChange: string => void,
	onRemove: TId => void,
	onUpload: () => void,
	images?: ?TWidgets,
	uploads: ?TImageLibraryListUploads,
|}>;

const Uploads = (props: TProps) => {
	const { t, images, onChange, uploads, onRemove, onUpload } = props;

	return (
		<>
			{['format', 'limit', 'size'].map((error: TImageLibraryErrors) => {
				const listError = _.filter(i => i?.error === error, uploads || {});
				return (
					listError.length > 0 && (
						<Errors
							key={error}
							t={t}
							messageType={error}
							numberOfFiles={listError.length}
						/>
					)
				);
			})}
			{!images || _.isEmpty(images) ? (
				<Empty t={t} onUpload={onUpload} />
			) : (
				<List
					images={images}
					uploads={uploads}
					onRemove={onRemove}
					onChange={onChange}
				/>
			)}
		</>
	);
};

export default React.memo<TProps>(Uploads);
