import { redirect, type Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

import { PUBLIC_API_URL } from '$env/static/public';
import { PRIVATE_JWT_SECRET } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('auth', { path: '/', httpOnly: true, secure: false, sameSite: 'lax' });

	console.log(token)

	const logout = () => {
		event.cookies.delete('auth', { path: '/', httpOnly: true, secure: false, sameSite: 'lax' });
		throw redirect(302, '/auth/login');
	};

	if (event.url.pathname.startsWith('/app')) {
		if (!token) return logout();

		try {
			const payload = jwt.verify(token, PRIVATE_JWT_SECRET);
			event.locals.user = payload;
		} catch (err) {
			console.error(err)
			return logout();
		}
	}

	// TODO: prevent loggedin users from going to login

	if (event.url.pathname.startsWith('/auth')) {
		if (token) {
			try {
				jwt.verify(token, PRIVATE_JWT_SECRET);
				throw redirect(302, '/app/home');
			} catch (err) {
				console.error(err)
			}
		}
	}

	return await resolve(event);
};
