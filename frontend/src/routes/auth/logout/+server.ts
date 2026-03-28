import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	cookies.delete('auth', {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax'
	});

	throw redirect(302, '/auth/login');
};