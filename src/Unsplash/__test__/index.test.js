// @flow
import React from 'react';
import '@babel/polyfill';
import { render, unmountComponentAtNode } from 'react-dom';
import { themes } from '@emulous/prototype';
import { ThemeProvider } from 'emotion-theming';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import Unsplash from '..';

jest.mock('../driver', () => ({
	getUnsplash: () =>
		Promise.resolve([
			{
				id: 'grzczyieFUw',
				created_at: '2020-10-03T16:51:12-04:00',
				updated_at: '2020-10-23T23:24:53-04:00',
				promoted_at: null,
				width: 6000,
				height: 4000,
				color: '#FACE27',
				blur_hash: 'LOH1*t~Ut1soPA%ft7WFx]58NKs;',
				description: null,
				alt_description: null,
				urls: {
					raw:
						'https://images.unsplash.com/photo-1601758260679-259d3f79c9a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE2Mzg3Nn0',
					full:
						'https://images.unsplash.com/photo-1601758260679-259d3f79c9a1?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE2Mzg3Nn0',
					regular:
						'https://images.unsplash.com/photo-1601758260679-259d3f79c9a1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE2Mzg3Nn0',
					small:
						'https://images.unsplash.com/photo-1601758260679-259d3f79c9a1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE2Mzg3Nn0',
					thumb:
						'https://images.unsplash.com/photo-1601758260679-259d3f79c9a1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE2Mzg3Nn0',
				},
				links: {
					self: 'https://api.unsplash.com/photos/grzczyieFUw',
					html: 'https://unsplash.com/photos/grzczyieFUw',
					download: 'https://unsplash.com/photos/grzczyieFUw/download',
					download_location:
						'https://api.unsplash.com/photos/grzczyieFUw/download',
				},
				categories: [],
				likes: 34,
				liked_by_user: false,
				current_user_collections: [],
				sponsorship: {
					impression_urls: [
						'https://secure.insightexpressai.com/adServer/adServerESI.aspx?script=false&bannerID=7686993&rnd=[timestamp]&gdpr=&gdpr_consent=&redir=https://secure.insightexpressai.com/adserver/1pixel.gif',
					],
					tagline: 'Pets Bring Us Together',
					tagline_url:
						'https://www.chewy.com/?utm_source=unsplash&utm_medium=brand&utm_term=chewy-44&utm_content=grzczyieFUw',
					sponsor: {
						id: '21uOSEd-cSI',
						updated_at: '2020-10-26T03:00:21-04:00',
						username: 'chewy',
						name: 'Chewy',
						first_name: 'Chewy',
						last_name: null,
						twitter_username: 'chewy',
						portfolio_url: 'https://www.chewy.com/',
						bio:
							'There are endless ways #PetsBringUsTogether. We\u2019re just here to help.',
						location: null,
						links: {
							self: 'https://api.unsplash.com/users/chewy',
							html: 'https://unsplash.com/@chewy',
							photos: 'https://api.unsplash.com/users/chewy/photos',
							likes: 'https://api.unsplash.com/users/chewy/likes',
							portfolio: 'https://api.unsplash.com/users/chewy/portfolio',
							following: 'https://api.unsplash.com/users/chewy/following',
							followers: 'https://api.unsplash.com/users/chewy/followers',
						},
						profile_image: {
							small:
								'https://images.unsplash.com/profile-1600206400067-ef9dc8ec33aaimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
							medium:
								'https://images.unsplash.com/profile-1600206400067-ef9dc8ec33aaimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
							large:
								'https://images.unsplash.com/profile-1600206400067-ef9dc8ec33aaimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
						},
						instagram_username: 'chewy',
						total_collections: 0,
						total_likes: 0,
						total_photos: 50,
						accepted_tos: true,
					},
				},
				user: {
					id: '21uOSEd-cSI',
					updated_at: '2020-10-26T03:00:21-04:00',
					username: 'chewy',
					name: 'Chewy',
					first_name: 'Chewy',
					last_name: null,
					twitter_username: 'chewy',
					portfolio_url: 'https://www.chewy.com/',
					bio:
						'There are endless ways #PetsBringUsTogether. We\u2019re just here to help.',
					location: null,
					links: {
						self: 'https://api.unsplash.com/users/chewy',
						html: 'https://unsplash.com/@chewy',
						photos: 'https://api.unsplash.com/users/chewy/photos',
						likes: 'https://api.unsplash.com/users/chewy/likes',
						portfolio: 'https://api.unsplash.com/users/chewy/portfolio',
						following: 'https://api.unsplash.com/users/chewy/following',
						followers: 'https://api.unsplash.com/users/chewy/followers',
					},
					profile_image: {
						small:
							'https://images.unsplash.com/profile-1600206400067-ef9dc8ec33aaimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
						medium:
							'https://images.unsplash.com/profile-1600206400067-ef9dc8ec33aaimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
						large:
							'https://images.unsplash.com/profile-1600206400067-ef9dc8ec33aaimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
					},
					instagram_username: 'chewy',
					total_collections: 0,
					total_likes: 0,
					total_photos: 50,
					accepted_tos: true,
				},
			},
			{
				id: 'PoVmAttlz8Y',
				created_at: '2020-10-25T16:25:49-04:00',
				updated_at: '2020-10-26T04:21:07-04:00',
				promoted_at: '2020-10-26T04:21:07-04:00',
				width: 6000,
				height: 3555,
				color: '#EEB582',
				blur_hash: 'LODkoNI;xZoL}rWXazj[9vxFNHWV',
				description: null,
				alt_description: null,
				urls: {
					raw:
						'https://images.unsplash.com/photo-1603657524073-29d513dce10d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE2Mzg3Nn0',
					full:
						'https://images.unsplash.com/photo-1603657524073-29d513dce10d?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE2Mzg3Nn0',
					regular:
						'https://images.unsplash.com/photo-1603657524073-29d513dce10d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE2Mzg3Nn0',
					small:
						'https://images.unsplash.com/photo-1603657524073-29d513dce10d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE2Mzg3Nn0',
					thumb:
						'https://images.unsplash.com/photo-1603657524073-29d513dce10d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE2Mzg3Nn0',
				},
				links: {
					self: 'https://api.unsplash.com/photos/PoVmAttlz8Y',
					html: 'https://unsplash.com/photos/PoVmAttlz8Y',
					download: 'https://unsplash.com/photos/PoVmAttlz8Y/download',
					download_location:
						'https://api.unsplash.com/photos/PoVmAttlz8Y/download',
				},
				categories: [],
				likes: 4,
				liked_by_user: false,
				current_user_collections: [],
				sponsorship: null,
				user: {
					id: 'JQP_qUcJRqU',
					updated_at: '2020-10-26T04:23:39-04:00',
					username: 'weirick',
					name: 'Jake Weirick',
					first_name: 'Jake',
					last_name: 'Weirick',
					twitter_username: 'boreganic',
					portfolio_url: null,
					bio:
						'Please let me know when you use my work as I love to see what you do with it no matter what it is.\r\n\r\nThanks!',
					location: 'Salt Lake City Utah',
					links: {
						self: 'https://api.unsplash.com/users/weirick',
						html: 'https://unsplash.com/@weirick',
						photos: 'https://api.unsplash.com/users/weirick/photos',
						likes: 'https://api.unsplash.com/users/weirick/likes',
						portfolio: 'https://api.unsplash.com/users/weirick/portfolio',
						following: 'https://api.unsplash.com/users/weirick/following',
						followers: 'https://api.unsplash.com/users/weirick/followers',
					},
					profile_image: {
						small:
							'https://images.unsplash.com/profile-1494214407268-a1b3bfdf0e09?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
						medium:
							'https://images.unsplash.com/profile-1494214407268-a1b3bfdf0e09?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
						large:
							'https://images.unsplash.com/profile-1494214407268-a1b3bfdf0e09?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
					},
					instagram_username: 'boreganic',
					total_collections: 0,
					total_likes: 167,
					total_photos: 373,
					accepted_tos: true,
				},
			},
		]),
}));

describe('test Unsplash with default params', () => {
	let container: Element;

	beforeAll(async () => {
		container = document.createElement('div');
		document.body?.appendChild(container);
		await act(async () => {
			render(
				<ThemeProvider theme={themes.light}>
					<Unsplash
						scrollParentRef={{ current: container }}
						t={() => ''}
						onChange={() => {}}
					/>
				</ThemeProvider>,
				container,
			);
		});
	});

	afterAll(() => {
		unmountComponentAtNode(container);
		container?.remove();
	});
	it('load images', async () => {
		const imgs = container?.querySelectorAll('img');

		expect(imgs).toHaveLength(2);
	});

	it('snapshot', async () => {
		expect(pretty(container?.innerHTML)).toMatchSnapshot();
	});
});

describe('test Unsplash with search line', () => {
	let container: Element;

	beforeAll(async () => {
		container = document.createElement('div');
		document.body?.appendChild(container);
		await act(async () => {
			render(
				<ThemeProvider theme={themes.light}>
					<Unsplash
						scrollParentRef={{ current: container }}
						t={() => ''}
						onChange={() => {}}
						searchLine="this is search"
					/>
				</ThemeProvider>,
				container,
			);
		});
	});

	afterAll(() => {
		unmountComponentAtNode(container);
		container?.remove();
	});
	it('load images', async () => {
		const imgs = container?.querySelectorAll('img');

		expect(imgs).toHaveLength(2);
	});

	it('snapshot', async () => {
		expect(container).toMatchSnapshot();
	});
});
