// @flow

import { useEffect, useRef, useState, useCallback } from 'react';
import _ from 'lodash/fp';
import type { TUnsplashImage, TUnsplashImages } from '@emulous/types';

import { getUnsplash, type TImgsUnsplash } from '../Unsplash/driver';

const MIN_IMAGE_HEIGHT = 75;
const MAX_PAGE_NUMBER = 50;

type TOptions = $ReadOnly<{|
	searchLine?: ?string,
	imgsCount: number,
	columnWidth: number,
	spacer: number,
|}>;

export type TOutUnsplash = $ReadOnly<{|
	listImgs: TUnsplashImages,
	loadMore: () => void,
	isWarn: boolean,
	isProcessing: boolean,
	height: number,
|}>;

export const useUnsplash = ({
	searchLine = null,
	columnWidth,
	imgsCount,
	spacer,
}: TOptions): TOutUnsplash => {
	const [listImgs, setListImgs] = useState<TUnsplashImages>([]);
	const [page, setPage] = useState<number>(1);

	const searchLineRef = useRef<?string>(null);
	const [height, setHeight] = useState<number>(0);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [isWarn, setIsWarn] = useState<boolean>(false);

	const heightLeft = useRef(0);
	const heightRight = useRef(0);

	const loadMore = useCallback(() => {
		if (isProcessing || page >= MAX_PAGE_NUMBER) return;
		setIsProcessing(true);
		setPage(page + 1);
	}, [setPage, page, isProcessing, setIsProcessing]);

	// loading imgs
	useEffect(() => {
		let isMounted: boolean = true;
		setIsProcessing(true);

		(async () => {
			try {
				if (!isMounted) {
					return;
				}
				let realPage: number = page;
				let realListImgs: TUnsplashImages = listImgs;
				if (searchLineRef.current !== searchLine) {
					searchLineRef.current = searchLine;
					setPage(1);
					realPage = 1;
					realListImgs = [];
					heightLeft.current = 0;
					heightRight.current = 0;
					setHeight(0);
				}
				const imgs: TImgsUnsplash = await getUnsplash(
					imgsCount,
					searchLine,
					realPage,
				);

				setListImgs(
					realListImgs.concat(
						_.map((img): TUnsplashImage => {
							if (!img || _.find({ key: img.id }, listImgs)) return {};

							const heightImg = Math.max(
								Math.floor(img.height / (img.width / columnWidth)),
								MIN_IMAGE_HEIGHT,
							);

							// Тут решается с каком столбце визуально будет картинка
							// Предпочтительно будет добавляться в левую часть
							// Считаем позицию для transform
							const side =
								heightLeft.current > heightRight.current
									? 'right'
									: 'left';
							let left = 0;
							let top = 0;

							if (side === 'left') {
								left = columnWidth + spacer;
								top = heightLeft.current;

								heightLeft.current =
									heightLeft.current + heightImg + spacer;
							}
							if (side === 'right') {
								left = 0;
								top = heightRight.current;

								heightRight.current =
									heightRight.current + heightImg + spacer;
							}

							return {
								src: img.urls.thumb,
								key: img.id,
								srcOrig: img.urls.regular,
								heightImg,
								author: {
									name: img.user.name || img.user.username,
									link: img.user.links.html || img.user.links.self,
								},
								widthImg: columnWidth,
								caption: img?.alt_description,
								top,
								left,
							};
						}, imgs),
					),
				);

				// Как только мы получили картинки и их размеры
				// устанавливаем высоту контейнера
				setHeight(Math.max(heightLeft.current, heightRight.current));

				if (!isMounted) {
					return;
				}
				setIsProcessing(false);
				setIsWarn(false);
			} catch (e) {
				if (!isMounted) {
					return;
				}
				setIsWarn(true);
				setIsProcessing(false);
			}
		})();
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [columnWidth, imgsCount, page, searchLine]);

	return { listImgs, loadMore, isWarn, isProcessing, height };
};

export default useUnsplash;
