// @flow

import React, { memo, useState, useMemo } from 'react';
import type { TUnsplashImage } from '@emulous/types';

import styled from '@emotion/styled';
import { Box, Text, LoaderIcon as Loader, PopupSelect, Link } from '@emulous/prototype';

import InfiniteScroll from 'react-infinite-scroller';

import Controls from '../Controls';
import { useUnsplash, type TOutUnsplash } from '../libs';

const UNSPLASH_UTM = 'utm_source=Emulous&utm_medium=referral';

const WrapProcess = styled.div`
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

const TextStyled = styled(Text)`
	margin-bottom: 12px;
`;

const Title = styled(Text)`
	margin-bottom: 18px;
	padding-top: 12px;
	cursor: default;
`;

const TextAttr = styled(Text)`
	font-size: 14px;
	line-height: 18px;
	font-weight: 500;
	padding-bottom: 18px;
	cursor: default;
	a {
		text-decoration: none;
		color: ${({ theme }) => theme.colors.text.accent};
	}
`;

const WrapImage = styled(Box)`
	position: absolute;
	overflow: hidden;
	border-radius: 4px;
	transform: translate(${({ top, left }) => `${left}px, ${top}`}px);
	height: ${({ heightImg }) => heightImg}px;
	width: ${({ widthImg }) => widthImg}px;
	animation-name: move;
	animation-duration: 0.25s;
	animation-delay: 0.25s;
	animation-fill-mode: both;
	animation-play-state: running;

	@keyframes move {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

const Image = styled.img`
	height: 100%;
	width: 100%;
`;

const ControlsWrap = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
`;

const defualtSettings = {
	imgsCount: 30,
	columnWidth: 141, // попап = 300, отступ 18
	spacer: 18,
};

type TProps = $ReadOnly<{|
	searchLine?: ?string,
	scrollParentRef: any,
	imgsCount?: number,
	columnWidth?: number,
	spacer?: number,
	t: string => string,
	onChange: string => void,
|}>;

function UnsplashList({
	searchLine = null,
	imgsCount = defualtSettings.imgsCount,
	columnWidth = defualtSettings.columnWidth,
	spacer = defualtSettings.spacer,
	scrollParentRef,
	t,
	onChange,
}: TProps) {
	const openPopupRef = React.useRef(null);
	const [keyOpenPopup, setKeyOpenPopup] = useState<?TUnsplashImage>(null);

	const getScrollParent = React.useCallback(() => scrollParentRef.current, [
		scrollParentRef,
	]);
	const {
		listImgs,
		loadMore,
		isWarn,
		isProcessing,
		height,
	}: TOutUnsplash = useUnsplash({
		searchLine,
		columnWidth,
		imgsCount,
		spacer,
	});
	const onShowAttr = React.useCallback(
		(e, k) => {
			openPopupRef.current = e.target;
			setKeyOpenPopup(listImgs.find(({ key }): boolean => key === k) || null);
		},
		[listImgs],
	);

	const onClosePopup = React.useCallback(() => setKeyOpenPopup(null), []);

	const gridBox = useMemo(
		() => ({
			height: `${height}px`,
			marginTop: '12px',
		}),
		[height],
	);
	return (
		<>
			{listImgs.length > 0 && (
				<InfiniteScroll
					pageStart={1}
					loadMore={loadMore}
					hasMore={!0}
					useWindow={false}
					getScrollParent={getScrollParent}
				>
					<Box sx={gridBox}>
						{listImgs.map(
							({
								heightImg,
								widthImg,
								src,
								caption,
								srcOrig,
								key,
								author,
								top,
								left,
							}) => {
								if (!src) return null;
								return (
									<WrapImage
										key={key}
										heightImg={heightImg}
										widthImg={widthImg}
										top={top}
										left={left}
									>
										<Image src={src} alt={caption} />
										<ControlsWrap>
											<Controls
												onChange={onChange}
												src={srcOrig}
												name={author.name}
												imageId={key}
												onShowAttr={onShowAttr}
											/>
										</ControlsWrap>
									</WrapImage>
								);
							},
						)}
					</Box>
				</InfiniteScroll>
			)}
			{!!keyOpenPopup && (
				<PopupSelect
					isOpen={!!keyOpenPopup}
					anchorEl={openPopupRef}
					offsetTop={0}
					offsetLeft={0}
					onClose={onClosePopup}
					width="auto"
				>
					<Title variant="headlinelg" color="text.primaryalt">
						{t('Attribution')}
					</Title>
					<TextAttr variant="bodysm" color="text.primary">
						{t('Photo by ')}
						<Link
							href={`${keyOpenPopup.author.link}?${UNSPLASH_UTM}`}
							target="_blank"
							color="text.accent"
						>
							{keyOpenPopup.author.name}
						</Link>
						{t(' on ')}
						<Link
							href={`https://unsplash.com/?${UNSPLASH_UTM}`}
							target="_blank"
							color="text.accent"
						>
							{t('Unsplash')}
						</Link>
					</TextAttr>
				</PopupSelect>
			)}
			{!listImgs.length && (
				<WrapProcess>
					{!isProcessing && !listImgs.length && searchLine && (
						<>
							<TextStyled variant="headlinemd" color="text.primary">
								{t('Sorry, no images found')}
							</TextStyled>
							<Text variant="bodysm" color="text.secondary">
								{t('Try another keyword')}
							</Text>
						</>
					)}
					{((isProcessing && !listImgs.length) || isWarn) && (
						<>
							<TextStyled variant="headlinemd" color="text.primary">
								{isWarn ? (
									t('Please try later')
								) : (
									<Loader size={30} color="bg.accent" />
								)}
							</TextStyled>
							{isWarn && (
								<>
									<Text variant="bodysm" color="text.secondary">
										{t('Cant’t grab images')}
									</Text>
									<Text variant="bodysm" color="text.secondary">
										{t('from external service')}
									</Text>
								</>
							)}
						</>
					)}
				</WrapProcess>
			)}
		</>
	);
}

export default memo<TProps>(UnsplashList);
