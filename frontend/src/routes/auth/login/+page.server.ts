import { redirect } from '@sveltejs/kit';
import { error, fail } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

import type { Actions } from './$types';

export const actions = {
	login: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password) {
			return fail(400, { message: 'Username and password are required.' });
		}

		console.log("cookies3")

		const body = { username, password };

		const req = await fetch(`${PUBLIC_API_URL}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});

		if (!req.ok) {
			return fail(req.status, { message: 'Username or password incorrect.' });
		}

		console.log("couldn't fetch")


		console.log("cookies2")

		const res = await req.json();

		if (res.status !== 200) {
			return fail(res.status, { message: res.message });
		}

		const { token } = res;

		console.log("cookies", token)

		cookies.set('auth', token, { path: '/', httpOnly: true, secure: false, sameSite: 'lax' });

		return redirect(302, '/app/home');
	}
} satisfies Actions;
