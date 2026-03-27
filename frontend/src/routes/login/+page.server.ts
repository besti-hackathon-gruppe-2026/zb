import type { Actions } from './$types';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		console.log(email, password)

		return { success: true };
	}
} satisfies Actions;
