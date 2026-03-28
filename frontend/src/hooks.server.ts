import { redirect, type Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

import { PRIVATE_JWT_SECRET } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/app')) {
		const token = event.cookies.get('auth');

		if (!token) {
			return redirect(302, '/login');
		}

		try {
			const payload = jwt.verify(token, PRIVATE_JWT_SECRET);
			event.locals.user = payload;
		} catch (err) {
			event.cookies.delete('auth', { path: '/' });
			return redirect(302, '/login');
		}
	}

	const response = await resolve(event);
	return response;
};
