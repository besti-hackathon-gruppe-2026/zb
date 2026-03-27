import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/app')) {
		// Check if user is logged in
	}

	const response = await resolve(event);
	return response;
};
