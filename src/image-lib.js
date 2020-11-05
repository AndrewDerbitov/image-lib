// @flow
import React from 'react';
import { Box, PopupWhite } from '@emulous/prototype';
import type { TWidgets, TImageLibraryListUploads, TId } from '@emulous/types';

import Uploads from './Uploads';
import DragUploader from './DragUploader';
import Unsplash from './Unsplash';
import Header from './Header';

type TProps = $ReadOnly<{|
	t: string => string,
	isShow: boolean,

	images?: ?TWidgets,
	uploads?: ?TImageLibraryListUploads,

	onClose: MouseEvent => void,
	onChange: string => void,
	onUpload?: FileList => void,
	onRemove: TId => void,
|}>;

const wrapBoxSx = {
	display: 'flex',
	flexDirection: 'column',
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	paddingTop: '24px',
	paddingBottom: '12px',
};

const scrollSx = {
	overflowY: 'auto',
	overflowX: 'hidden',
	position: 'relative',
	flex: 1,

	'::-webkit-scrollbar': {
		width: '6px',
		backgroundColor: 'transparent',
	},
	'::-webkit-scrollbar-button': {
		display: 'none',
	},
	'::-webkit-scrollbar-track': {
		backgroundColor: 'transparent',
		borderRadius: 'md.all',
	},
	'::-webkit-scrollbar-track:hover': {
		backgroundColor: 'bg.primaryaltplus',
	},
	'::-webkit-scrollbar-thumb': {
		backgroundColor: 'transparent',
		borderRadius: 'md.all',
	},
	':hover::-webkit-scrollbar-thumb': {
		backgroundColor: 'bg.secondaryminus',
	},
	'::-webkit-scrollbar-thumb:hover': {
		backgroundColor: 'text.tertiary',
	},
};

const scrollContainerSx = {
	padding: '0 24px',
};

const ImageLib = (props: TProps) => {
	const {
		t,
		isShow,
		onClose,
		onChange,
		onUpload,
		onRemove,
		images,
		uploads: listUploads,
	} = props;
	const [activeTab, setActiveTab] = React.useState('uploads');
	const [searchLine, setSearchLine] = React.useState<?string>(null);
	const uploadRef = React.useRef<?HTMLInputElement>();
	const scrollParentRef = React.useRef();

	const onUploadFiles = React.useCallback(
		files => {
			setActiveTab('uploads');
			if (onUpload) onUpload(files);
		},
		[onUpload],
	);

	const upload = React.useCallback(() => {
		uploadRef.current?.click();
	}, []);

	const anchorRef = React.useRef(document.body);

	return (
		<>
			<PopupWhite
				isOpen={isShow}
				anchorEl={anchorRef}
				offsetLeft={7}
				offsetTop={54}
				onClose={onClose}
				mutex="images"
				width={348}
				height="full"
				isFixed={false}
				placement="right"
			>
				<Box sx={wrapBoxSx}>
					<Header
						t={t}
						ref={uploadRef}
						setActiveTab={setActiveTab}
						onUploadFiles={onUploadFiles}
						setSearchLine={setSearchLine}
						upload={upload}
						activeTab={activeTab}
					/>
					<Box sx={scrollSx} ref={scrollParentRef}>
						<Box sx={scrollContainerSx}>
							{activeTab === 'uploads' && (
								<Uploads
									t={t}
									images={images}
									uploads={listUploads}
									onChange={onChange}
									onRemove={onRemove}
									onUpload={upload}
								/>
							)}
							{activeTab === 'unsplash' && (
								<Unsplash
									t={t}
									onChange={onChange}
									searchLine={searchLine}
									scrollParentRef={scrollParentRef}
								/>
							)}
						</Box>
					</Box>
				</Box>
			</PopupWhite>
			{onUpload && <DragUploader t={t} onUpload={onUploadFiles} />}
		</>
	);
};

export default React.memo<TProps>(ImageLib);
