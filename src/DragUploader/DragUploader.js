// @flow

import React, { memo, useEffect, useCallback } from 'react';
import _ from 'lodash/fp';
import { Box, Text, Portal } from '@emulous/prototype';
import { zIndices } from '@emulous/constants';
import Glyph from './folder.svg';

type TProps = $ReadOnly<{|
	isDisabled?: boolean,
	t: string => string,
	onUpload: FileList => void,
|}>;

const boxSx = {
	position: 'absolute',
	left: '72px',
	top: '72px',
	pointerEvents: 'none',
};
const boxBorderSx = {
	position: 'absolute',
	left: '12px',
	top: '12px',
	bottom: '12px',
	right: '12px',
	border: '2px dashed rgba(255,255,255,0.5)',
	boxSizing: 'border-box',
	borderRadius: '12px',
	pointerEvents: 'none',
};

const uploadSx = {
	backgroundColor: 'rgba(0,0,0,0.75)',
	width: '100%',
	height: '100%',
	left: '0px',
	right: '0px',
	top: '0px',
	bottom: '0px',
	position: 'absolute',
	zIndex: zIndices.dragUploader,
};

const imageSx = {
	position: 'absolute',
	left: '77px',
	top: '146px',
	pointerEvents: 'none',
	overflow: 'hidden',
	svg: {
		transitionTimingFunction: 'cubic-bezier(.25, .46, .45, .94)',
		transitionDuration: '0.25s',
		transitionProperty: 'fill',
		fill: 'white',
	},
};

const body: HTMLElement = document.body || document.createElement('div');

function DragUploader({ isDisabled = false, t, onUpload }: TProps) {
	const [isUploadMode, setUploadMode] = React.useState(false);

	const onEnterOnBody = useCallback((e: DragEvent) => {
		e.stopPropagation();
		if (e.dataTransfer?.effectAllowed !== 'copyMove') {
			// switch on block with uploading file
			setUploadMode(true);
			body.removeEventListener('dragenter', onEnterOnBody);
		}
	}, []);

	useEffect(() => {
		if (isDisabled) return;
		// add event on body
		body.addEventListener('dragenter', onEnterOnBody);
		// eslint-disable-next-line consistent-return
		return () => {
			body.removeEventListener('dragenter', onEnterOnBody);
		};
	}, [isDisabled, onEnterOnBody]);

	const onDropHandler = useCallback(
		(e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			const droppedFiles = e.dataTransfer?.files;

			if (!droppedFiles) return;
			onUpload(droppedFiles);

			setUploadMode(false);
			body.addEventListener('dragenter', onEnterOnBody);
		},
		[onEnterOnBody, onUpload],
	);

	// try cancel native behavor
	const onDragHandler = useCallback((e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const onLeaveHandler = useCallback(
		(e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setUploadMode(false);
			// delay for enough time to move out the window
			_.delay(100, () => body.addEventListener('dragenter', onEnterOnBody));
		},
		[onEnterOnBody],
	);
	return (
		!isDisabled &&
		isUploadMode && (
			<Portal>
				<Box
					data-id="drag-upload"
					sx={uploadSx}
					onDrop={onDropHandler}
					onDragEnter={onDragHandler}
					onDragLeave={onLeaveHandler}
					onDragOver={onDragHandler}
				>
					<Box sx={boxBorderSx}>
						<Box sx={boxSx}>
							<Text variant="leadmd" color="white">
								{t('Drop files to upload')}
							</Text>
						</Box>
						<Box sx={imageSx}>
							<Glyph />
						</Box>
					</Box>
				</Box>
			</Portal>
		)
	);
}

export default memo<TProps>(DragUploader);
