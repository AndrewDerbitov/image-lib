// @flow

import Unsplash, { toJson } from 'unsplash-js';
import { config } from '@emulous/constants';

const unsplash = new Unsplash({ accessKey: config.apiUnsplashKey });

export type TImgsUnsplash = $ReadOnlyArray<{
	urls: { regular: string, thumb: string },
	id: string,
	height: number,
	width: number,
	description: ?string,
	alt_description: ?string,
	user: { name: string, username: string, links: { html: string, self: string } },
}>;

/**
 * Loading latest imgs from unsplash
 *
 * @param {*} imgsCount
 * @param {*} page
 */
const latestUnsplash = async (
	imgsCount: number,
	page: number = 1,
): Promise<TImgsUnsplash> => {
	const response = await unsplash.photos.listPhotos(page, imgsCount, 'latest');

	return toJson(response);
};

/**
 * Loking for key in unsplash
 *
 * @param {*} key
 * @param {*} imgsCount
 * @param {*} page
 */
const searchUnsplash = async (
	key: string,
	imgsCount,
	page = 1,
): Promise<?{ results: TImgsUnsplash }> => {
	if (!key.length) return null;

	const response = await unsplash.search.photos(key, page, imgsCount);

	return toJson(response);
};

/**
 * Get list of imgs
 *
 * @param {*} imgsCount
 * @param {*} key
 * @param {*} page
 */
export const getUnsplash = async (
	imgsCount: number,
	key?: ?string = null,
	page?: number = 1,
): Promise<TImgsUnsplash> => {
	// if more than 30 imgs then doing several request
	if (key) {
		const search = await searchUnsplash(key, imgsCount, page);
		return search?.results || [];
	}

	return latestUnsplash(imgsCount, page);
};

export default Unsplash;
