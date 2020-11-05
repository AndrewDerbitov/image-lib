// @flow
import React from 'react';
import styled from '@emotion/styled';
import _ from 'lodash/fp';

import { Text, ButtonGroup, Button, Input, Icon, Box } from '@emulous/prototype';

type TProps = $ReadOnly<{|
	t: string => string,
	setActiveTab: string => void,
	onUploadFiles: (files: FileList) => void,
	setSearchLine: (?string) => void,
	upload: () => void,
	activeTab: string,
|}>;

const Wrap = styled(Box)``;

const UploadInp = styled(Input)`
	display: none;
`;

const Upload = styled(Button)`
	position: absolute;
	right: 60px;
`;

const Title = styled(Text)`
	margin-left: 24px;
	margin-bottom: 18px;
	cursor: default;
`;

const Tabs = styled(ButtonGroup)`
	margin-top: 27px;
`;

const StyledInput = styled(Input)`
	width: 100%;
	padding-left: 33px;
`;

const WrapInput = styled.div`
	position: relative;
	margin: 24px 24px 12px;
`;

const iconSearchSx = {
	position: 'absolute',
	left: 0,
	top: 0,
	margin: '6px 10px',
};

const Header = (
	{ t, setActiveTab, onUploadFiles, setSearchLine, upload, activeTab }: TProps,
	// ref: { current: ?(null | HTMLInputElement | (HTMLInputElement => mixed)) },
	ref,
) => {
	const tabList = React.useMemo(
		() => [
			{ label: t('Uploads'), name: 'uploads' },
			{ label: t('Unsplash'), name: 'unsplash' },
		],
		[t],
	);

	const searchInp = React.useRef();

	const clickBound = React.useCallback(
		(e, name) => {
			if (typeof name === 'string') {
				const tab = tabList.find(item => item.name === name) || tabList[0];
				setSearchLine(null);
				setActiveTab(tab.name);
			}
		},
		[setActiveTab, setSearchLine, tabList],
	);

	const handlerUpload = React.useCallback(() => {
		if (ref.current && ref.current instanceof HTMLInputElement) {
			onUploadFiles(ref.current?.files);
		}
	}, [onUploadFiles, ref]);

	const onSearch = React.useMemo(
		() =>
			_.debounce(1e3, () => {
				setSearchLine(
					searchInp.current?.value && searchInp.current?.value.length > 2
						? searchInp.current?.value
						: null,
				);
			}),
		[setSearchLine],
	);

	const focusSearchInput = React.useCallback(() => {
		searchInp.current?.focus();
	}, []);

	return (
		<Wrap>
			<UploadInp
				type="file"
				ref={ref}
				name="fileInput"
				onChange={handlerUpload}
				multiple
			/>
			<Upload variant="success.rounded.sm" onClick={upload}>
				{t('Upload')}
			</Upload>
			<Title variant="title4" color="text.primaryalt">
				{t('Images')}
			</Title>
			<Tabs
				behavior="radio"
				active={activeTab}
				buttons={tabList}
				shape="underlined"
				variant="flat"
				size="sm"
				colors="secondaryflat"
				activeColors="accentflat"
				onClick={clickBound}
			/>
			{activeTab === 'unsplash' && (
				<WrapInput onClick={focusSearchInput}>
					<Icon
						name="search"
						colors="tertiaryflat"
						size="xxsm"
						sx={iconSearchSx}
					/>
					<StyledInput
						ref={searchInp}
						variant="input.sm"
						type="text"
						placeholder={t('Search')}
						onChange={onSearch}
					/>
				</WrapInput>
			)}
		</Wrap>
	);
};

export default React.memo<TProps, HTMLInputElement>(
	React.forwardRef<TProps, HTMLInputElement>(Header),
);
